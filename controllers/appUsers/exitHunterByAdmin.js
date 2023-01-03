const db = require('../../db/dbConnection');

const removeHunterByAdmin = (req,res)=>{
    db.query('UPDATE tbl_app_users SET hunter_remove_status = 1 WHERE id = "'+req.body.id+'"',(err,data)=>{
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
                message: 'Hunter Remove Successfully'
            })
            return;
        }
    })
}

module.exports = removeHunterByAdmin;