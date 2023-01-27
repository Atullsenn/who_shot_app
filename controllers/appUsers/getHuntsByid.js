const db = require('../../db/dbConnection');

const getHuntById = (req,res)=>{
    const huntData = []

    if(req.body.user_id === "" || req.body.user_id === null){
        res.status(400).send({
            success: false,
            message: "Plese Provide User Id"
        })
        return;
    }
    //function
    const getHuntMember = (id,callback)=>{
        db.query('SELECT COUNT(hunter_id) AS joined FROM tbl_hunters WHERE hunt_id = "'+id+'"',(err,data)=>{
            
            if(err){
                res.status(500).send({
                    success: "false",
                    message: err
                })
                return;
            }
    
            else{           
                return callback(data[0].joined);
            }
        })
        
    }
    //function


    //function two
    const getJoinedHunts = (userId)=>{
        const resultRecord = []
        db.query('SELECT hunt_id FROM tbl_hunters WHERE hunter_id = "'+userId+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: "false",
                    message: err
                })
                return;
            }

            else{
             data.forEach((e)=>{
                var arr = {}
                arr['id'] = e.id;
                arr['huntName'] = e.hunt_name;
                arr['startDate'] = e.start_date;
                resultRecord.push(arr)
             })
                
            }
        })
        return resultRecord;
    }



    //function two

    db.query('SELECT a.* FROM tbl_hunt a WHERE a.user_id = "'+req.body.user_id+'" AND end_date IS NULL AND end_time IS NULL AND cancel_hunt = 0', (err,data)=>{
        if(err){
            res.status(500).send({
                success: "false",
                message: err
            })
            return;
        }

        else{
           
            data.forEach(e => {
                var dataArr = {};
                dataArr['hunt_id'] = e.id;
                dataArr['user_id'] = e.user_id;
                dataArr['huntName'] = e.hunt_name;
                dataArr['date'] = e.date;
                dataArr['startDate'] = e.start_date;
                dataArr['startTime'] = e.start_time;
                dataArr['huntImage'] = e.hunt_image;
                getHuntMember(e.id,function(result){
                    dataArr["totalJoinedHunt"] = result;
                })
                
                huntData.push(dataArr)
            })

           setTimeout(()=>{
            res.status(200).send({
                success: "true",
                message: 'Data Collected Successfully',
                data: huntData,
                
            })
            return;

           },1000)
           
            
        }
        
    })
}


module.exports = getHuntById;