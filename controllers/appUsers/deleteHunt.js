const db = require('../../db/dbConnection');

const deleteHunt = (req,res)=>{
    db.query('DELETE FROM tbl_hunt WHERE id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        else{
            res.status(200).send({
                success: true,
                message:'Hunt Deleted Successfully'
            })
        }
    })
}

module.exports = deleteHunt;