const db = require('../../db/dbConnection')

const getHunts = (req,res)=>{
    db.query('SELECT * FROM tbl_hunt',(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).send({
                success: false,
                message: err
            })
        }
        else{
            console.log(data)
            res.status(200).send({
                success: true,
                message:'Data Collected Successfully',
                Hunts: data
            })
        }
    })
}

module.exports = getHunts;