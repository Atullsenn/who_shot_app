const db  = require('../../db/dbConnection');
const md5Hash = require('crypto-js');


const signUp = (req,res)=>{
    var password = req.body.password;
    var hash = md5Hash.MD5(password)
     
   if(req.body.full_name == '' || req.body.full_name == null){
        return res.status(400).send({
            success: "false",
            message: 'please provide first_name'

        })
    }
    
    if(req.body.email == '' || req.body.email == null){
        return res.status(400).send({
            success: "false",
            message: 'Please provide email'

        })
    }
   
    if(req.body.password == '' || req.body.password == null){
        return res.status(400).send({
            success: "false",
            message: 'Please Enter Your Password'

        })
    }

    if(req.body.phone == '' || req.body.phone == null){
        return res.status(400).send({
            success: "false",
            message: 'Please Enter Your Phone'

        })
    }
    

    db.query('SELECT * FROM tbl_app_users WHERE email = "'+req.body.email+'" OR phone = "'+req.body.phone+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message:err
            })
        }
        

        if(data.length > 0){
            res.status(400).send({
                success: "false",
                message:'Please Enter Valid Information'})
                return;
        }

        else{

            db.query(`INSERT INTO tbl_app_users  (full_name,phone, email, password)
    VALUES ('${req.body.full_name}','${req.body.phone}', '${req.body.email}', '${hash}');`,(err,data)=>{
      if (err) {
        res.status(500).send({
            success: "false",
            message: err
        });
        return;
      }
        res.status(200).send({
            success: "true",
            message: 'SignUp Successfully'
        });
        return;
    });

        }
    })
}


module.exports = signUp;