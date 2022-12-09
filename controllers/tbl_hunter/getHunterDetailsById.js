const db = require('../../db/dbConnection')


const getHunterDetailsById = (req,res)=>{
    db.query('SELECT a.* FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE a.id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        if(!data.length){
            res.status(400).send({
                success: false,
                message: 'No Hunter Found'
            })
        }
        else{
            res.status(200).send({
                success: true,
                message: 'Data Collected Successfully',
                hunter: data
            })
        }
    })
}


module.exports = getHunterDetailsById;