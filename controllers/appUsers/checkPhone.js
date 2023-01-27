const db = require('../../db/dbConnection');

const checkPhone = (req,res)=>{

    if(req.body.phone == '' || req.body.phone == null){
        res.status(500).send({
            success: "false",
            message: 'Please Enter Your Phone Number'
        })
        return;
    }

    db.query('SELECT id,phone FROM tbl_app_users WHERE phone = "'+req.body.phone+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        if(data.length == 0){
            res.status(201).send({
                success: "false",
                message: 'Phone Number Invalid'
            })
            return;
        }
        

        else{
            res.status(200).send({
                success: "true",
                data: data[0],
                message: 'Otp Send Successfully'
            })
            return;
        }
    })
}



module.exports = checkPhone;