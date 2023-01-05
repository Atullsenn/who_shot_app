const db = require('../../db/dbConnection')


const getHunterDetailsById = (req,res)=>{
    const dataArr = []

    const getHuntName = (huntID,callback)=>{
        db.query('SELECT hunt_name FROM tbl_hunt WHERE id = "'+huntID+'"',(err,data)=>{
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
    db.query('SELECT a.*, b.no_of_killed, b.no_of_missed, b.no_of_wound, b.no_of_fire,b.hunt_id, (b.no_of_killed + b.no_of_missed + b.no_of_wound + no_of_fire) AS totalShots FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE b.id = "'+req.body.id+'"',(err,data)=>{
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

            data.forEach(e=>{
                var arr = {}
                arr['hunterID'] = e.id;
                arr['huntID'] = e.hunt_id;
                arr['hunterName'] = e.full_name;
                arr['profile'] = e.profile;
                arr['killed'] = e.no_of_killed;
                arr['missed'] = e.no_of_missed;
                arr['fire'] = e.no_of_fire;
                arr['wound'] = e.no_of_wound;
                getHuntName(e.hunt_id, function(result){
                    arr['huntName'] = result[0].hunt_name;
                })
                dataArr.push(arr)
            })

            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    message: 'Data Collected Successfully',
                    hunter: dataArr
                })

            },1000)
            
        }
    })
}


module.exports = getHunterDetailsById;