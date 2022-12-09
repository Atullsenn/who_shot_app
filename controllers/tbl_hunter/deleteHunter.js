const db = require('../../db/dbConnection');


const hunterDelete = (req,res)=>{
    db.query('UPDATE tbl_app_users SET deleteStatus = 1 WHERE id= "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        else{
            res.status(200).send({
                success: true,
                message: 'Hunter Deleted Successfully'
            })
        }
    })
}


module.exports = hunterDelete;