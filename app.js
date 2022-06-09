const express = require("express");
const weather = express();
const bodyParser = require("body-Parser");
const https = require("https")


weather.use(bodyParser.urlencoded({extended: true}));


weather.listen("3002", function(){
    console.log("Running on port 3002")
})


weather.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

weather.post("/", function(req,res){
    const country = req.body.country;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=4584fcb638de22aea1ad4418ef43fbbb`
https.get(url, (response)=>{
console.log(response.statusCode)
response.on("data",(data)=>{
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const des = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const adr = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    https.get(adr, (response)=>{
        response.on('data',(data)=>{

        })

    })
    res.write(`<p>The weather in ${country} is: ${des}</p>`)
    res.write(`<h1>The temperature in ${country} is: ${temp}</h1>`)
    res.write(`<img src=${adr} alt="weather icon">`);
   


    res.send()
})
})
})
