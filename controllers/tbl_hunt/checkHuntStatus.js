const e = require('express');
const db = require('../../db/dbConnection');

const checkHuntStatus = (req,res)=>{
    db.query('SELECT start_hunt_status, end_date FROM tbl_hunt WHERE id = "'+req.body.id+'"',(err,data)=>{
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
            message: 'Success',
            data: data[0]
        })
    }
    })

   
}

module.exports = checkHuntStatus;