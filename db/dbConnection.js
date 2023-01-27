var mysql = require("mysql")



const connection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"who_shot_app_db"
    
})
connection.connect((error)=>{
if(error){
    console.log(error)
}else{
    console.log("Database Connected Successfully");
}
    
})

module.exports= connection;
