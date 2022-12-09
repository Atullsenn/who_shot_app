const db = require('../../db/dbConnection');

const huntersLogin = (req,res)=>{
    if(req.body.passcode == '' || req.body.passcode == null){
        res.status(400).send({
            success: false,
            message: 'Please Enter PassCode'
        })
        return;
    }
    if(req.body.hunter_id == '' ||  req.body.hunter_id == null){
        res.status(400).send({
            success: false,
            message: "Please Provide Hunter Id"
        })
        return;
    }
    db.query('SELECT user_id, hunt_name,passcode FROM tbl_hunt WHERE hunt_name = "'+req.body.hunt_name+'" AND passcode = "'+req.body.passcode+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }
        if(!data.length){
            res.status(400).send({
                success: false,
                message: 'Please Enter Correct Passcode'
            })
            return;

        }
        else{
            db.query(`INSERT INTO tbl_hunters(hunt_id,hunter_id) VALUES('${data[0].user_id}', '${req.body.hunter_id}')`,(err,data)=>{
                if(err){
                    res.status(500).send({
                        success: false,
                        message: err
                    })
                }
            })
            res.status(200).send({
                success: true,
                message: 'Login Successfully'
            })
        }
    })
}


module.exports = huntersLogin;