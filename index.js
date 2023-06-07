const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
    var crypto=req.body.crypto;
    var currency=req.body.currency;
    var amount=req.body.amount;
    var baseURL="https://apiv2.bitcoinaverage.com/convert/global";
    var options={
        url:baseURL,
        qs:{
            from:crypto,
            to:currency,
            amount:amount
        }
    }
    request(options,(error,response,body)=>{
        var data=JSON.parse(body);
        console.log(data);
        var currenttime=data.time;
        res.write("<h1>current time is:"+ currenttime);
        res.write("the amount of "+ amount+" "+crypto+" cureencyies in "+currency+"is "+data.price);
        console.log(data.price);
        res.send();

    })
   
})
app.listen(3000,()=>{
    console.log("app is live");
})