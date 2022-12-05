const sql = require("../../db/dbConnection");

const Createcontact = (request,res)=>{

    sql.query('SELECT COUNT(id) AS totalCount FROM tbl_contact_us',(err,resq)=>{
      if (err) {
      res.status(500).send({
        success: false,
        message: err
      })
        return;
      }
       if(resq[0].totalCount>0)
       {
        sql.query(`UPDATE tbl_contact_us SET phone='${request.body.phone}' ,  email ='${request.body.email}', address ='${request.body.address}' WHERE id=1 `,(err,data)=>{
         
          if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
            return;
          }
            res.status(200).send({
                success: true,
                message: 'Contact Updated Successfully'
            })
            return;
        });
  
      
       }
       else
       {
        sql.query(`INSERT INTO tbl_contact_us  (phone, email, address)
    VALUES ('${request.body.phone}','${request.body.email}', '${request.body.address}');`,(err,data)=>{
      if (err) {
        res.status(500).send({
            success: false,
            message: err
        })
        return;
      }
        res.status(200).send({
            success: true,
            message: 'Contact Created Successfully'
        })
        return;
    });
       }
     
    });
  }

  module.exports = Createcontact; 