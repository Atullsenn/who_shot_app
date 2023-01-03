const db = require('../../db/dbConnection')

const deleteNotification = (req,res)=>{
    db.query('UPDATE tbl_notifications SET deleteStatus = 1 WHERE id = "'+req.body.id+'"',(err,data)=>{
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
                message: 'Notification Deleted Successfully'
            })
            return;
        }
    })
}

module.exports = deleteNotification;