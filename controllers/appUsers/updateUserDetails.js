const db = require('../../db/dbConnection');

const updateAppUser = (req,res)=>{
    if(req.body.profile == ''){
        var sqls = 'UPDATE tbl_app_users SET full_name = "'+req.body.full_name+'", email = "'+req.body.email+'", phone = "'+req.body.email+'"';
    }

    else{

        var sqls = 'UPDATE tbl_app_users SET full_name = "'+req.body.full_name+'", email = "'+req.body.email+'", phone = "'+req.body.email+'", profile = "'+req.body.filename+'"'
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