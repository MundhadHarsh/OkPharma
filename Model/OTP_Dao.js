const express = require ('express')
const app = express()

const port = 3000
const config = require("../Connection/OTP_Config")
const client = require ('twilio')(config.accountSID,config.authToken)

function sending (req,res){

    if(req.query.phonenumber){
        client
            .verify
            .services(config.serviceID)
            .verifications
            .create({
                        to: `+${req.query.phonenumber}`,
                        channel : req.query.channel==='call' ? 'call' : 'sms'
            })
            .then((data)=>{
                res.status(200).send({
                    message: "Verification is Sent !!",
                    phonenumber: req.query.phonenumber,
                    data
                })
               
            })
        }else{
            res.status(400).send({
                message: "Wrong Phone Number : ",
                phonenumber: req.query.phonenumber,
                data
            })
            res.send('err')
            console.log('err');
        }

}

function check(req,res){

    if(req.query.phonenumber && (req.query.code).length===6){
            client
            .verify
            .services(config.serviceID)
            .verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code : req.query.code
    })
    .then((data)=>{
        if(data.status === "Sucessfully"){
        res.status(200).send({
            message : "User is Verified !!",
            data
        })
      }
    })
  }else{
    res.send({
        message: "Wrong Phone Number or Code : ",
                phonenumber: req.query.phonenumber,
                data
    })
    
    res.send('err')
    console.log('err');
  }
}

module.exports={
                    check,
                    sending
}
