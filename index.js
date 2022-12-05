const express= require("express");
const port= 8000;
const app= express();
const bodyParser= require("body-parser")
app.use(express.json());
const dotenv= require("dotenv");
dotenv.config({path:'./.env'});
const { urlencoded } = require("express");
app.use(urlencoded({extended:true}));
app.use( bodyParser.json() );      
const cors = require('cors');
const db = require('./db/dbConnection')
app.use(cors());


//Import Controllers
const addPrivacy = require('./controllers/privacyPolicy/createPrivacyPolicy');
const GetPrivacy = require('./controllers/privacyPolicy/getPrivacy');
const termsConditions = require('./controllers/termsAndServices/termsCondition');
const GetTerms = require('./controllers/termsAndServices/getTerms');
const Contact = require('./controllers/Contact/contact');
const getContact = require('./controllers/Contact/getContact');
const aboutUs = require('./controllers/aboutUs/about');
const getAboutUs = require('./controllers/aboutUs/getAbout');



//For Mobile
const userSignUp = require('./controllers/appUsers/signUp');
const userLogin = require('./controllers/appUsers/userLogin');





//Routes
app.post('/privacy',addPrivacy);
app.get('/getPrivacy',GetPrivacy);
app.post('/termsConditions',termsConditions);
app.get('/getTerms',GetTerms);
app.post('/contact',Contact);
app.get('/getContact',getContact);
app.post('/aboutUs',aboutUs);
app.get('/getAboutUs', getAboutUs);


//Routes For Mobile App
app.post('/userSignUp', userSignUp);
app.post('/userLogin',userLogin);


app.post("/loginAdmin", (req, res) => {
 
  
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
      'SELECT * FROM tbl_users WHERE password="'+ req.body.password+'" AND email ="'+req.body.email+'"',
      (err, result) => {
       // console.log(result);
        // user does not exists
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
  });

app.listen(port,()=>{
    console.log(`server is listening to the port on ${port}`)
});