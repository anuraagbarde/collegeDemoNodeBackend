const fetch = require('node-fetch');

function sendData(data) {
    fetch('http://localhost:9000/college', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => console.log(res))
        .catch(err => {
            console.log(err)
        });
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

let coursesList = ["ML", "OOPS", "OS", "ADA", "DS", "DL", "CC", "WEB", "CN", "TOC", "DBMS", "M1", "M2", "M3", "M4", "PS", "AI", "SE"]

function makeData(stateName, cityList, starti) {
    let endi = starti + 20;
    for (let i = starti; i < endi; i++) {
        let data = {};

        data.name = "College" + i;
        data.yearFounded = Math.trunc(2000 + i / 3);
        data.country = "India";
        data.noOfStudents = Math.trunc(Math.random() * (2000 + i * 40));
        data.courses = getRandom(coursesList, 4);

        data.state = stateName;
        data.city = cityList[Math.floor(Math.random() * cityList.length)];

        // console.log(typeof(data));
        console.log(data);
        sendData(data);
    }
}

makeData("Madhya Pradesh", ["Indore", "Gwalior", "Bhopal"], 1);
makeData("Karnataka", ["Banglore", "Mysore", "Manglore"], 21);
makeData("Maharashtra", ["Mumbai", "Nagpur", "Pune"], 41);
makeData("Uttar Pradesh", ["Allahabad", "Kanpur", "Lucknow"], 61);
makeData("Tamil Nadu", ["Chennai", "Madhurai", "Coimbatore"], 81);

console.log("Process Complete");