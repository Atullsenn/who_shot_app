const db = require('../../db/dbConnection');


const getAllHunters = (req,res)=>{
    db.query('SELECT a.* FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        else{
            res.status(200).send({
                success: true,
                message: 'Data Collected Successfully',
                hunters: data
            })
        }
    })
}


module.exports = getAllHunters;