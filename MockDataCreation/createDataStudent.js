const fetch = require('node-fetch');

function sendData(data) {
    fetch('http://localhost:9000/student/', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
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


skillList = ["c++", "c", "python", "react", "node", "mongo", "mongoose", "neural networks", "data warehousing", "cyber security", "amazon web services", "aws s3", "aws lambda", "serverless", "cloudfront CDN", "multi-threading", "multi-processing", "distributed systems", "cloud computing", "django", "sql", "postgresql"];

async function createStudent(college) {
    for (let i = 1; i <= 100; i++) {
        let data = {};
        data.name = 'Student' + i + college.name;
        data.yearOfBatch = parseInt(college.yearFounded) + (Math.floor(i / 20));
        data.collegeref = college._id;
        data.skills = getRandom(skillList, Math.floor(Math.random()*5 + 1));

        // console.log(data);
        sendData(data);
    }

}

async function getCollege(collegeName) {
    try{
        const collegeObject = await fetch(`http://localhost:9000/college/name/${collegeName}/`);
        collegeJson = await collegeObject.json();
        return collegeJson[0];
    }catch(e){
        console.log(e);
    }

}

mainish = async () => {
    try{
        for(let i=1;i<=100;i++){
            let college = await getCollege(`College${i}`);
            createStudent(college);
        }
    }catch(e){
        console.log(e);
    }
}

mainish();


// createStudent(tempCollege)