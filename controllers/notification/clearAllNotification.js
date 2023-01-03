const db = require('../../db/dbConnection');

const clearAllNotification = (req,res)=>{
    db.query('',(err,data)=>{
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
                message: 'Clear All Messages Successfully'
            })
            return;
        }
    })
}


module.exports = clearAllNotification;