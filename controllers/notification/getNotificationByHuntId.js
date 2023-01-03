const db = require('../../db/dbConnection');
const moment = require('moment')


const getNotificationByHuntId = (req,res)=>{
    db.query('SELECT heading, description, date From tbl_notifications WHERE hunt_id = "'+req.body.hunt_id+'"',(err,data)=>{
        if(err){
        res.status(500).send({
            success: false,
            message: err
        })
        return;
    }

    if(data.length == 0){
        res.status(201).send({
            succes: false,
            message: 'Notification Not Found'
        })
        return;
    }

        else{
            res.status(200).send({
                success: true,
                notification: data
            })
            return;
        }
    })
}

module.exports = getNotificationByHuntId;