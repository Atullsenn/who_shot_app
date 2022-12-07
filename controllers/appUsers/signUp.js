const db  = require('../../db/dbConnection');
var bcrypt = require('bcryptjs');
const saltRounds = 10;


const signUp = (req,res)=>{
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, saltRounds);
     
    if(req.body.fullname == '' && req.body.fullname == null){
        return res.status(400).send({
            success: false,
            message: 'Please provide first_name'

        })
    }
    
    if(!req.body.email == '' && req.body.email == null){
        return res.status(400).send({
            success: false,
            message: 'Please provide email'

        })
    }
   
    if(!req.body.password == '' && req.body.password == null){
        return res.status(400).send({
            success: false,
            message: 'Please Enter Your Password'

        })
    }
    

    db.query('SELECT email FROM tbl_app_users WHERE email = "'+req.body.email+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message:err
            })
        }
        if(data.length != 0){
            res.status(400).send({
                success: false,
                message:'Email already exist'})
        }
        else{

            db.query(`INSERT INTO tbl_app_users  (full_name,phone, email, password)
    VALUES ('${req.body.full_name}','${req.body.phone}', '${req.body.email}', '${req.body.password}');`,(err,data)=>{
      if (err) {
        res.status(500).send({
            success: false,
            message: err
        });
        return;
      }
        res.status(200).send({
            success: true,
            message: 'SignUp Successfully'
        });
        return;
    });

        }
    })
}


module.exports = signUp;