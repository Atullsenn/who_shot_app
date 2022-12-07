const sql = require("../../db/dbConnection");
  
  const updateUsers = (request,res)=>{

    if(request.body.profile_image){
      var sqls = 'UPDATE  tbl_users SET name ="'+request.body.name+'", phone = "'+request.body.phone+'", address = "'+request.body.address+'", gender = "'+request.body.gender+'", postal = "'+request.body.postal+'" WHERE id = "'+request.body.id+'"'

    }
    else{
      const filePath = request.protocol + "://" + host + ':' + port + '/image/' + request.file.filename;
      var sqls = 'UPDATE  tbl_users SET name ="'+request.body.name+'", phone = "'+request.body.phone+'", address = "'+request.body.address+'", gender = "'+request.body.gender+'", postal = "'+request.body.postal+'", profile_image="'+request.file.filename+'" WHERE id = "'+request.body.id+'"'
    }
    
    
    sql.query(sqls,(err,data)=>{
      if (err) {

        res.status(500).send({
            success: false,
            message: err
        })
        return;
      }
        res.status(200).send({
            success: true,
            message: 'Data Updated Successfully',
        })
        return;
    });

    
  }



  module.exports = updateUsers;