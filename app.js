const request = require('request');
const express= require ("express");
const app=express();


app.set('view engine', 'ejs');

//const https= require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));






app.get ("/", function(req,res){

 res.render("mausam",{temp:null , desc:null});
    
})             
              
               

app.post ("/",function (req,res){
   
    var cityName= req.body.city_name;
    console.log (cityName);

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=b9f4b33bb67861d9f9a11763b9b09f0e&units=metric";

    request(url,function (err,response,body) {

      if(err) {
        res.render('mausam', 
            {temp: null, error: 'Error, please try again'});
    } else {
    
       // response.on("data",function (data) {
         const dataConvert=JSON.parse(body);
         const set_temp=dataConvert.main.temp;
         const set_desc=dataConvert.weather[0].description;
         if (set_temp==undefined){
           res.render('mausam',{temp:null,error: 'Error, please try again'});
         }
         else{
          res.render("mausam",{temp:set_temp , desc:set_desc});
         }
          
        }
      //  })
       
   })
    

       res.redirect("/");
      
})
app.get ("/", function(req,res){

  res.render("mausam",{temp:null , desc:null});
     
 })       



app.listen(8000,function(){
  console.log ("Port running on 8000");
                        });
                        


                        