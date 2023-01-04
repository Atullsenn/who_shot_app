const db = require('../../db/dbConnection');

const clearAllNotification = (req,res)=>{
    db.query('SELECT SUM(no_of_killed) FROM tbl_hunters WHERE hunter_id = "'+req.body.hunter_id+'"',(err,data)=>{
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