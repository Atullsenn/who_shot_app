const db = require('../../db/dbConnection');

const startHunt = (req,res)=>{
    db.query('UPDATE tbl_hunt SET start_hunt_status = 1 WHERE id = "'+req.body.id+'"',(err,data)=>{
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
                message: 'Hunt Start Successfully'
            })
            return;
        }
    })
}


module.exports = startHunt;