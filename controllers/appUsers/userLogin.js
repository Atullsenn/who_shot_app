const db = require('../../db/dbConnection');

const userLogin = (req,res)=>{
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
    'SELECT * FROM tbl_app_users WHERE password="'+ req.body.password+'" AND email ="'+req.body.email+'"',
    (err, result) => {
      if (err) {
        throw err; 
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          success: "false",
          msg: "Email or password is incorrect!",
          
        });
      } 
      else{
        return res.status(200).send({
                  success:'true',
                  msg: 'Login Successfully!',
                  user: result[0]
                });
      }

    }
  );

}


module.exports = userLogin;