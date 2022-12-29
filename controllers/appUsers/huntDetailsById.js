const db = require('../../db/dbConnection')

const getHunter = (hunter_id)=>{

    const hunterData = []
    db.query('SELECT a.hunter_id, b.full_name FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE hunt_id = "'+hunter_id+'"',(err,data)=>{
        if(err){
            console.log("err")
        }
        data.forEach(e => {
            const arr = {}
            // arr['hunter_id'] = e.hunter_id,
            arr['hunterName'] = e.full_name
            hunterData.push(arr)
        });
       
    })
   
    return hunterData;

}

const getHuntDetailsById = (req,res)=>{

    const dataa = []
    db.query('SELECT a.id,a.hunt_name, a.passcode, b.full_name FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id WHERE a.id = "'+req.body.id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }
        else{

            data.forEach(e => {
                const dataArr = {}
                dataArr['huntName'] = e.hunt_name,
                dataArr['passcode'] = e.passcode,
                dataArr['Admin'] = e.full_name,
                dataArr['hunter_id'] = e.hunter_id,
                dataArr['Id'] = e.id,
                dataArr['hunters'] = getHunter(e.id),
                dataa.push(dataArr)
            });

           
            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    data: dataa,
                })
                return;

            },1000)
            
        }
    })
}


module.exports = getHuntDetailsById;