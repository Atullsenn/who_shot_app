const db = require('../../db/dbConnection');

const participateHunt = (req,res)=>{

    if(req.body.hunter_id == "" || req.body.hunter_id == null){
        res.status(400).send({
            success: "false",
            message: "Please Enter hunter_id"
        })
        return;
    }

    db.query('SELECT a.id, a.hunt_id, a.hunter_id, a.admin_id, a.no_of_killed AS killed, a.no_of_missed AS missed, a.no_of_wound AS wound, a.no_of_fire AS fire, b.date AS CreatedDate, b.hunt_name, b.hunt_image AS huntProfile, c.full_name AS AdminName FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON a.admin_id = c.id WHERE hunter_id = "'+req.body.hunter_id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }


        if(data.length === 0){
            res.status(201).send({
                success: "false",
                message: "Hunter Does not exist"
            })
            return;
        }

        else{
            res.status(200).send({
                success: "true",
                message: "Collecting Data Successfully",
                data: data
            })
            return;
        }
    })

}



module.exports = participateHunt;