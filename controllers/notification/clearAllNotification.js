const db = require('../../db/dbConnection');

const clearAllNotification = (req,res)=>{
    db.query('SELECT CONCAT(hunt_name," ", passcode) AS fullName, NOW() AS currentDate FROM tbl_hunt WHERE id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }

        else{
            res.status(200).send({
                success: true,
                message: 'Success',
                data: data
            })
            return;
        }
    })
}


module.exports = clearAllNotification;