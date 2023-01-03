const db = require('../../db/dbConnection')

const getHunter = (hunter_id)=>{

    const hunterData = []
    db.query('SELECT a.hunter_id, b.full_name, b.profile FROM tbl_hunters a INNER JOIN tbl_app_users b ON a.hunter_id = b.id WHERE hunt_id = "'+hunter_id+'" AND a.hunter_remove_status = 0',(err,data)=>{
        if(err){
            console.log("err")
        }

        data.forEach(e => {
            const arr = {}
            arr['hunter_id'] = e.hunter_id,
            arr['hunterName'] = e.full_name;
            arr['hunterProfile'] = e.profile;
            hunterData.push(arr)
        });
       
    })
   
    return hunterData;

}

const getHuntDetailsById = (req,res)=>{

    const dataa = []
    db.query('SELECT a.id,a.group_id,a.hunt_name, a.passcode, a.hunt_image, a.start_date, a.start_time, a.end_date, a.end_time, b.full_name FROM tbl_hunt a INNER JOIN tbl_app_users b ON a.user_id = b.id WHERE a.id = "'+req.body.id+'"',(err,data)=>{
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
                dataArr['huntName'] = e.hunt_name;
                dataArr['passcode'] = e.passcode;
                dataArr['Admin'] = e.full_name;
                dataArr['huntProfile'] = e.hunt_image;
                dataArr['huntStartDate'] = e.start_date;
                dataArr['huntStartTime'] = e.start_time;
                dataArr['hunter_id'] = e.hunter_id;
                dataArr['hunt_id'] = e.id;
                dataArr['group_id'] = e.group_id;
                dataArr['hunters'] = getHunter(e.id);
                dataa.push(dataArr)
            });

           
            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    data: dataa[0],
                })
                return;

            },1000)
            
        }
    })
}


module.exports = getHuntDetailsById;