const db = require('../../db/dbConnection')

const updateHunt = (req,res)=>{
    if(!req.body.hunt_image){
        var sql = 'UPDATE tbl_hunt SET hunt_name = "'+req.body.hunt_name+'", passcode = "'+req.body.passcode+'", start_date = "'+req.body.start_date+'", start_time = "'+req.body.start_time+'" WHERE id = "'+req.body.id+'"'
    }
    else{
        var sql = 'UPDATE tbl_hunt SET hunt_name = "'+req.body.hunt_name+'", hunt_image = "'+req.file.filename+'", passcode = "'+req.body.passcode+'", start_date = "'+req.body.start_date+'", start_time = "'+req.body.start_time+'" WHERE id = "'+req.body.id+'"'
    }

    db.query(sql,(err,data)=>{
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
                message: 'Hunt Updated Successfully'
            })
            return;
        }
    })
}

module.exports = updateHunt;