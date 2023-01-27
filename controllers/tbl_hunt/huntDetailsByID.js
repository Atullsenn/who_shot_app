const db = require('../../db/dbConnection')


const huntDetailsByID = (req,res)=>{
    const resultData = []

    //Function
    const getHuntDetail = (huntId, callback)=>{
        const hunt = [];
        db.query('SELECT a.full_name AS hunter, a.profile, b.no_of_killed AS killed, b.no_of_missed AS missed, b.no_of_fire AS fire, b.no_of_wound AS wound, (b.no_of_killed + b.no_of_missed + b.no_of_wound + b.no_of_fire) AS totalShots FROM tbl_app_users a INNER JOIN tbl_hunters b ON a.id = b.hunter_id WHERE b.hunt_id = "'+huntId+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }

            else{
                data.forEach(item=>{
                    const huntData = {}
                    huntData['hunterName'] = item.hunter;
                    huntData['hunterProfile'] = item.profile;
                    huntData['totalShots'] = item.totalShots;
                    huntData['noOfKilled'] = item.killed;
                    huntData['noOfMissed'] = item.missed;
                    huntData['noOfWound'] = item.wound;
                    huntData['noOfFire'] = item.fire;
                    hunt.push(huntData)
                })

            }
        })
        return hunt;

    }




    //Function
    db.query('SELECT a.*, COUNT(b.hunter_id) AS totalParticipants, SUM(b.no_of_killed) AS totalKilled, SUM(b.no_of_missed) AS totalMissed, SUM(b.no_of_wound) AS totalWound, SUM(b.no_of_fire) AS totalFire FROM tbl_hunt a INNER JOIN tbl_hunters b ON a.id = b.hunt_id WHERE a.id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err,
            })
            return;
        }

        else{

            data.forEach(e=>{
                var arr = {}
                arr['huntId'] = e.id;
                arr['adminId'] = e.user_id;
                arr['huntName'] = e.hunt_name;
                arr['huntProfile'] = e.hunt_image;
                arr['createdDate'] = e.date;
                arr['totalParticipants'] = e.totalParticipants;
                arr['totalKilled'] = e.totalKilled;
                arr['totalMissed'] = e.totalMissed;
                arr['totalWound'] = e.totalWound;
                arr['totalFire'] = e.totalFire;
                (arr["huntDetail"] = getHuntDetail(e.id))  
                resultData.push(arr)
            })
            

            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    message: "Data Collecting Successfully",
                    data: resultData
                })

            },1000)
            
        }
    })
}


module.exports = huntDetailsByID;