require('rootpath')();
const Express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http')

const cors = require('cors')
var app = Express();

const Call = require('./Connection/All_Cont_Conn')

const port =8081

app.use(bodyParser.urlencoded({limit : '50mb',extended:true,parameterLimit:1000000}))
app.use(bodyParser.json());



app.use('/',Call)

const server = http.createServer(app);

server.listen(port,()=>console.log(`Running on Server :${port}`));

