const axios = require('axios');
var fs = require('fs');
let readlineSync = require("readline-sync");

axios.get("http://saral.navgurukul.org/api/courses").then(resp => {
    Data = resp.data
    let json = JSON.stringify(Data,null,4);
    // console.log(typeof json);
    // console.log(json);
    fs.writeFileSync("courses1.JSON",json)
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
    axios.get("http://saral.navgurukul.org/api/courses/"+ (Data["availableCourses"][course_number - 1]["id"]) + "/exercises").then(resp => {
        Data1 = resp.data
        let json1 = JSON.stringify(Data1,null,4);
        // console.log(typeof json1)
        // console.log(json1)
        fs.writeFileSync("parent1.JSON",json1)
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
            s = (Data1["data"][topic_number-1]["childExercises"][m]["slug"])
            m++
        }
        parent_exercise_id = 1
        axios.get("http://saral.navgurukul.org/api/courses/" + (parent_exercise_id) +"/exercise/getBySlug?slug=" + slug).then(resp => {
            Data2 = resp.data;
            let json2 = JSON.stringify(Data2,null,4)
            console.log(json2)
            // let file_2=JSON.stringify(json_2)
            fs.writeFileSync("topic1.JSON", json_2)
            // my_list.push(Data2["content"])
            // var questions_no = readlineSync.question ("choose the specific questions no :- ")
            // question=questions_no-1
            // console.log(my_list[question])
        });
    });
});  
 