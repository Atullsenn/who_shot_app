const db = require('../../db/dbConnection');


const getNotification = (req,res)=>{
    db.query('SELECT a.*, b.hunt_name As huntname FROM tbl_notifications a INNER JOIN tbl_hunt b ON a.hunt_id = b.id',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }

        else{
            res.status(200).send({
                success: true,
                message: 'Data Collecting Successfully',
                data: data
            })
        }
    })
}


module.exports = getNotification;