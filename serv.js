 const express = require("express");
 const app = express();
 const bodyParser = require("body-parser");
const res = require("express/lib/response");
const port=300;
 const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

 app.post("/",function(req,res){
     const city = req.body.cityname;
     const appid = "cf9336b6ab3d54dfbb9b71b6a7386729";
     const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" +appid;

     https.get(url,function(response){
         console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData= JSON.parse(data)
        const temp = weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        res.write("<h1>the tempreture in "+city+"is" +temp + "degree celsius</h1>");
        res.write("the clods in "+city +" are" +description +"done");
        res.write("<img src="+imageURl+">");
        res.send();
    })
     })
     
 })

 app.listen(port,()=>{
     console.log(`runs on${port}`);
 })