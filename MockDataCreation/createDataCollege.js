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

// let coursesList = ["ML", "OOPS", "OS", "ADA", "DS", "DL", "CC", "WEB", "CN", "TOC", "DBMS", "M1", "M2", "M3", "M4", "PS", "AI", "SE"]
let coursesList = ["Computer Science", "Electrical", "Electronics", "Mechanical", "Civil", "BioTechnology"]

function makeData(stateName, cityList, starti) {
    let endi = starti + Math.floor(Math.random() * 40);
    console.log(endi);
    for (let i = starti; i < endi; i++) {
        if(endi > 100)return 200;
        let data = {};

        data.name = "College" + i;
        data.yearFounded = Math.trunc(1947 + i / 3);
        data.country = "India";
        data.noOfStudents = Math.trunc(Math.random() * (2000 + i * 40));
        data.courses = getRandom(coursesList, Math.floor(Math.random()*3 + 1));

        data.state = stateName;
        data.city = cityList[Math.floor(Math.random() * cityList.length)];

        // console.log(typeof(data));
        console.log(data);
        sendData(data);
    }
    return endi;
}

let r0 = 1
let r1 = 0;
let r2 = 0;
let r3 = 0;
let r4 = 0;
let r5 = 0;

while (r1 < 100 && r2 < 100 && r3 < 100 && r4 < 100 && r5 < 100) {
    r1 = makeData("Madhya Pradesh", ["Indore", "Gwalior", "Bhopal"], r0);
    r2 = makeData("Karnataka", ["Banglore", "Mysore", "Manglore"], r1);
    r3 = makeData("Maharashtra", ["Mumbai", "Nagpur", "Pune"], r2);
    r4 = makeData("Uttar Pradesh", ["Allahabad", "Kanpur", "Lucknow"], r3);
    r5 = makeData("Tamil Nadu", ["Chennai", "Madhurai", "Coimbatore"], r4);
    r0 = r5;
}

console.log("Process Complete");