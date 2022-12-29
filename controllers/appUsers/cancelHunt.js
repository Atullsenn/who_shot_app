const db = require('../../db/dbConnection');

const cancelHunt = (req,res)=>{

    db.query('UPDATE tbl_hunt SET cancel_hunt = 1 WHERE id = "'+req.body.id+'"',(err,data)=>{
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
                message: "Hunt Cancelled Successfully"
            })
            return;
        }
    })

}


module.exports = cancelHunt;