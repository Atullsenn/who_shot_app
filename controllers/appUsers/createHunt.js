const db = require('../../db/dbConnection')


const createHunt = (req,res)=>{

    if(req.body.user_id == '' || req.body.user_id == null){
        res.status(400).send({
            success: false,
            message: 'Please Provide  User Id'
        })
    }

    if(req.body.hunt_name == '' || req.body.hunt_name == null){
        res.status(400).send({
            success: false,
            message: 'Please Enter Hunt Name'
        })
        return;
    }

    if(req.body.passcode == '' || req.body.passcode == null){
        res.status(400).send({
            success: false,
            message: 'Please Enter Passcode'
        })
        return;

    }
    
    db.query('SELECT hunt_name FROM tbl_hunt WHERE hunt_name = "'+req.body.hunt_name+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
        }
        if(data.length > 0){
            res.status(400).send({
                success: false,
                message: 'Please Choose Other Name'
            })
        }
        else{
            db.query(`INSERT INTO tbl_hunt(user_id,hunt_name,passcode) VALUES('${req.body.user_id}','${req.body.hunt_name}', '${req.body.passcode}')`,(err)=>{
                if(err){
                    res.status(500).send({
                        success: false,
                        message: err
                    })
                }
                else{
                    res.status(200).send({
                        success: true,
                        message: 'Hunt Created Successfully'
                    })
                }
            })

        }
    })
    
}

module.exports = createHunt;



