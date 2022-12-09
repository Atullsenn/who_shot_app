const db = require('../../db/dbConnection');

const sendNotification = (req,res)=>{

    db.query(`INSERT INTO tbl_notifications (heading,description,hunt_id) 
    VALUES ('${req.body.heading}','${req.body.description}','${req.body.hunt_id}');`,(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).send({
                success: false,
                message: err
            })
        }

        else{
            res.status(200).send({
                success: true,
                message: 'Notification Send Successfully'
            })
        }
    })

}

module.exports = sendNotification;