const e = require('express');
const db = require('../../db/dbConnection');

const getHuntDetailsById = (req,res)=>{
    const resultData = [];

    //Function
    const getHunterDetails = (huntID, callback)=>{
        db.query('SELECT a.full_name, SUM(b.no_of_killed + no_of_wound +  no_of_fire + no_of_missed) AS total, b.no_of_killed , b.no_of_missed, b.no_of_fire, b.no_of_wound FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE hunt_id = "'+huntID+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }

            else{
                return callback(data)
            }
        })
    }


    const getAdminName = (huntID, callback)=>{
        db.query('SELECT a.full_name FROM tbl_app_users a INNER JOIN tbl_hunters b ON b.admin_id = a.id WHERE b.hunt_id = "'+huntID+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }
            
            else{
               return callback(data)
            }
        })
    }

    //Function
    db.query('SELECT * FROM tbl_hunt WHERE id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }

        else{
            data.forEach(e=>{
                var arrObj = {}
                arrObj['huntID'] = e.id;
                arrObj['huntName'] = e.hunt_name;
                arrObj['Profile'] = e.profile;
                arrObj['DateCreated'] = e.date;
                arrObj['huntLive'] = e.start_hunt_status;
                getHunterDetails(e.id,function(result){
                    arrObj['hunterName'] = result[0].full_name;
                    arrObj['totalShots'] = result[0].total;
                    arrObj['killed'] = result[0].no_of_killed;
                    arrObj['missed'] = result[0].no_of_missed;
                    arrObj['fired'] = result[0].no_of_fire;
                    arrObj['wound'] = result[0].no_of_wound;
                })
                getAdminName(e.id, function(item){
                    arrObj['huntAdmin'] = item[0].full_name;
                })
                resultData.push(arrObj);
            })

            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    message: 'Data Collected Successfully',
                    data: resultData[0]
                })
                return;

            },1000)
           
        }
    })
}


module.exports = getHuntDetailsById;