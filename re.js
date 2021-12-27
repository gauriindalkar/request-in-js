const axios = require('axios');
var fs = require('fs');
let readlineSync = require("readline-sync");
var link="https://api.merakilearn.org/courses"
axios.get(link).then(resp => {
    Data = resp.data
    let json = JSON.stringify(Data,null,4);
    // console.log(typeof json);
    // console.log(json);
    fs.writeFileSync("saral_data.json",json)
    console.log("")
    console.log("**Welcome to navgurukul and Learn basic Programming launguage**")
    console.log("")
    serial_number = 1
    var arr=[]
    for(i of Data){
        console.log(serial_number,".",i["name"],"-",i["id"]);
        arr.push(i["name"],i["id"])
        serial_number++;
    }
    var course_number = readlineSync.questionInt("Enter your number do you want:-");
    console.log (Data[course_number]["name"])
    id = Data[course_number]["id"]
    var link_2="https://api.merakilearn.org/courses/"+id+"/exercises"
    axios.get(link_2).then(response1 => {
        Data_1 = response1.data
        let json1 = JSON.stringify(Data_1,null,4);
        fs.writeFileSync("parent_data.json",json1)
        course_name=Data_1["course"]["exercises"]
        sr_no=1
        for (j in course_name){
            console.log(sr_no,course_name[j]["name"])
            sr_no++
        }
        slug=readlineSync.questionInt("enter the question number:")
        console.log(course_name[slug]["name"])
        var Question=course_name[slug]["content"][0]["value"]
        console.log(Question)
        
    
}).catch(error1=>{
        console.log(error1)
})
})
.catch(error=>{
    console.log(error)
})