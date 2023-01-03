const db = require('../../db/dbConnection');

const updateAppUser = (req,res)=>{
    if(req.body.profile == ''){
        var sqls = 'UPDATE tbl_app_users SET full_name = "'+req.body.full_name+'", email = "'+req.body.email+'", phone = "'+req.body.phone+'" WHERE id = "'+req.body.id+'"';
    }

    else{

        var sqls = 'UPDATE tbl_app_users SET full_name = "'+req.body.full_name+'", email = "'+req.body.email+'", phone = "'+req.body.phone+'", profile = "'+req.file.filename+'" WHERE id = "'+req.body.id+'"'
    }
    
    db.query(sqls,(err)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        else{
            res.status(200).send({
                success: true,
                message: 'Updated Successfully'
            })
        }
    })

}

module.exports = updateAppUser;