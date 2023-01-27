const db = require('../../db/dbConnection')


const getHunterDetailsById = (req,res)=>{
    const dataArr = []


    //Function For Hunter Details

    const getHunterDetails = (hunterId)=>{
        var arr = []
        db.query('SELECT a.no_of_killed, a.no_of_missed, a.no_of_wound, a.no_of_fire, a.date AS joinedDate, b.hunt_name,b.hunt_image, (a.no_of_missed + a.no_of_wound + a.no_of_killed + a.no_of_fire) AS totalShots FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE a.hunter_id = "'+hunterId+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }

            else{
                data.forEach(e => {
                    var hunterData = {}
                    hunterData['killed'] = e.no_of_killed;
                    hunterData['missed'] = e.no_of_missed;
                    hunterData['wound'] = e.no_of_wound;
                    hunterData['fire'] = e.no_of_fire;
                    hunterData['huntJoinedDate'] = e.joinedDate;
                    hunterData['huntName'] = e.hunt_name;
                    hunterData['huntProfile'] = e.hunt_image;
                    hunterData['totalShots'] = e.totalShots;
                  
                    arr.push(hunterData)
                })
              
            }
        })
        return arr;
    }

    //Function For Hunters Details

    db.query('SELECT a.hunter_id,b.full_name, b.profile, Count(a.hunt_id) AS totalJoinedHunts FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE a.hunter_id = "'+req.body.hunter_id+'"',(err,data)=>{
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
                arrObj['hunterId'] = e.hunter_id;
                arrObj['hunterName'] = e.full_name;
                arrObj['profile'] = e.profile;
                arrObj['totalJoinedHunts'] = e.totalJoinedHunts;
                arrObj["hunter"] = getHunterDetails(e.hunter_id)
                dataArr.push(arrObj)
            })


            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    message: 'Data Collected Succcessfully',
                    data: dataArr[0]
                })
                return;

            }, 1000)
            
        }
    })
}


module.exports = getHunterDetailsById;