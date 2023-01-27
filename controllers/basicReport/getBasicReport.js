const db = require('../../db/dbConnection');


// const val = 1 + "";
// console.log(val); // Result: "1"
// console.log(typeof val); // Result: "string"

// console.log(2 ** 8)


// let array = [1,2,3,4,5,6,7,8]
// array = array.slice(0,8)
// console.log(array)

// //get the last item in an Array
// console.log(array.slice(0,-2))

// //json object
// console.log(JSON.stringify({'name': 'Atullsenn', 'age' : 22}, null, '\t'))

// const person = {
//     name: 'Atull',
//     age: 22,
//     skills: [
//         "Programming",
//         "Cooking",
//         "Tennis"
//     ]
// }
// //copy json 
// const copied = JSON.parse(JSON.stringify(person))

// console.log(person.skills === copied.skills);
// console.log(person)
// console.log('copied')
// console.log(copied)

// const getusername = (username)=>{
//     return 'ram';
// }

// //if condition
// let username = getusername();
// if(!username){
//     username = 'Atullsenn'
// }
// else{
//     username = 'Narendra'
// }
// console.log(username)
// // Search in array
// const occupations = [
//     "Teacher",
//     "Doctor",
//     "Singer",
//     "chef",
// ];

// const result = occupations.find(o => o.startsWith("S"));
// console.log(result)

// // Remove Duplicates
// const numbers = [5,9,3,9,7,2,2,7,7]
// const withoutDuplicates = Array.from(new Set(numbers))
// console.log(withoutDuplicates)
// const copyNumbers = [...numbers]
// console.log("copyNumbers")
// console.log(copyNumbers)

// // Invoking function
// const someComplexValue = (() => {
//     const a = 100;
//     const b = 20;

//     if (a > b) {
//         return a * b;
//     }

//     return b / a;
// })();

// console.log("Some Complex Value")
// console.log(someComplexValue)


// //Flatten the array of the array

// var array2 = [123, 500, [1, 2, [34, 56, 67, [234, 1245], 900]], 845, [30257]]

// const flattenArr = array2.flat(Infinity)
// console.log(flattenArr)



const basicReport = (req,res)=>{
    const resultData = []


    //Function 
    const groupDetails = (huntId, callback)=>{
        db.query('SELECT Count(hunter_id) AS totalRegistration, SUM(no_of_killed + no_of_missed + no_of_fire + no_of_wound) AS totalShots FROM tbl_hunters WHERE hunt_id = "'+huntId+'"',(err,data)=>{
            if(err){
                res.status(500).send({
                    success: false,
                    message: err
                })
                return;
            }

            else{
                return callback(data)
            }
        })
    }




    //Function
    db.query('SELECT * FROM tbl_hunt WHERE end_date IS NOT NULL',(err,data)=>{
        if(err){
            res.status(500).send({
                success: false,
                message: err
            })
            return;
        }

        else{
            data.forEach(e=>{
                var arrObj = {}
                arrObj['huntID'] = e.id;
                arrObj['huntName'] = e.hunt_name;
                arrObj['startDate'] = e.start_date;
                arrObj['endDate'] = e.end_date;
                groupDetails(e.id, function(result){
                    arrObj['totalRegistration '] = result[0].totalRegistration;
                    arrObj['totalShots'] = result[0].totalShots;
                })
                resultData.push(arrObj)
            })

            setTimeout(()=>{
                res.status(200).send({
                    success: true,
                    message: 'Data Collected Successfully',
                    data: resultData
                })
                return;
                
            },1000)
            
        }
    })
}



module.exports = basicReport;