const axios = require('axios');
var fs = require('fs');
let readlineSync = require("readline-sync");

axios.get("http://saral.navgurukul.org/api/courses").then(resp => {
    Data = resp.data
    let json = JSON.stringify(Data,null,4);
    // console.log(typeof json);
    // console.log(json);
    fs.writeFileSync("courses.JSON",json)
    console.log("")
    console.log("***Welcome to navgurukul and Learn basic Programming launguage***")
    console.log("")
    serial_number = 1
    for(i of Data["availableCourses"]){
        console.log(serial_number,".",i["name"],"-",i["id"]);
        serial_number++;
    }
    var course_number = readlineSync.questionInt("Enter your number do you want:-");
    id = Data["availableCourses"][course_number-1]["id"];
    console.log(Data["availableCourses"][course_number-1]["name"]);
    user = readlineSync.question("Enter weather do you want perious or next(n/p):-");
    serial_number = 1;
    if(user == "p"){
        for (i of Data["availableCourses"]){
            console.log(serial_number + 1,".",i["name"],".",i["id"]);
            serial_number++
        }
    course_number = readlineSync.questionInt("Enter your number do you want:-");
    console.log(Data["availableCourses"][course_number - 1]["name"]);
    console.log(Data["availableCourses"][course_number - 1]["id"]);
    }else if(user == "n"){
        axios.get("http://saral.navgurukul.org/api/courses/"+ (Data["availableCourses"][course_number - 1]["id"]) + "/exercises").then(resp => {
        Data1 = resp.data
        let json1 = JSON.stringify(Data1,null,4);
        // console.log(typeof json1)
        // console.log(json1)
        fs.writeFileSync("parent.JSON",json1)
        serial_number1 = 0
        for(i of Data1["data"]){
            console.log("      ",serial_number1+=1,".",i["name"]);
            if (i["childExercises"].length>0){
                var s = 0;
                for (j of i["childExercises"]){
                    s++;
                    console.log("               ",s,j["name"]);
                }
            }else{
                console.log("               1",i["slug"]);
            }
            serial_number++;
        }
        console.log("")
        var topic_number = readlineSync.question("Enter topic number that's you want to learn:-");
        var m = 0;
        while(m<(Data1["data"][topic_number - 1]["childExercises"].length)){
            console.log("               ",m+1,Data1["data"][topic_number - 1]["childExercises"][m]["name"]);
            slug = (Data1["data"][topic_number-1]["childExercises"][m]["slug"])
            m++
        }
    });
    }
}); 
