const db = require('../../db/dbConnection');

const getHuntMember = (id)=>{
    const member = []
    db.query('SELECT COUNT(id) AS joined FROM tbl_hunters WHERE hunt_id = "'+id+'"',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }

        else{
            var hunter = {};

            data.forEach(e => {
                hunter['totalHuntMember'] = e.joined;
                member.push(hunter)
                
            })
            console.log(member)
        }
    })
     return member;
}

const getHuntById = (req,res)=>{
    const huntData = []
    db.query('SELECT * FROM tbl_hunt WHERE user_id = "'+req.body.user_id+'" AND end_date IS NULL AND end_time IS NULL', (err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }

        else{
            var dataArr = {};

            data.forEach(e => {
                dataArr['Id'] = e.id;
                dataArr['hunt_id'] = e.user_id;
                dataArr['huntName'] = e.hunt_name;
                dataArr['date'] = e.date;
                dataArr["hunt"] = getHuntMember(e.id)
                huntData.push(dataArr)
                

            })
            console.log(huntData)

           setTimeout(()=>{
            res.status(200).send({
                success: true,
                message: 'Data Collected Successfully',
                data: huntData,
            })
            return;

           },1000)
           
            
        }
    })
}


module.exports = getHuntById;