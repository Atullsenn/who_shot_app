const bcrypt = require ('bcryptjs');
const db = require('../../db/dbConnection'); 
 

const userLogin = (req,res)=>{
  const saltRounds =10
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
if (!req.body.email && req.body.email == null) {
    return res.status(400).send({
      success: "false",
      msg: "email  is empty!",
    });
  }
  if (!req.body.password && req.body.password == null) {
    return res.status(400).send({
      success: "false",
      msg: "password is empty!",
    });
  }



  // var encryptPassowrd = md5Hash.MD5(req.body.password);
  //`SELECT * FROM tbl_users WHERE email = ${sql.escape(req.body.login)} AND password=${(encryptPassowrd)}`
  db.query(
    'SELECT * FROM tbl_app_users WHERE password="'+req.body.password+'" AND email ="'+req.body.email+'"',
    async(err, results) => {
      if (err) {
        res.status(500).send({
          success: false,
          message:err
        })
      }
      if(!results.length){
        res.status(400).send({
          success: false,
          message: 'Email Or Password Incorrect'
        })
      }
      else{  
        res.status(200).send({
          success: true,
          message: 'Login Successfully',
          user: results[0]
        })     
       
        }
     
})

}


module.exports = userLogin;



