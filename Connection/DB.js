const mssql=require('mssql')

async function connection(){
    return new Promise((resolve, reject) => {

var configuration= { 
    server:"DESKTOP-RN1VB5C",
    user:"sa",
    password:"OKPHARMA123",
    database:"MEDICAL",
    port:1433,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        trustServerCertificate: true
    }
};

new mssql.connect(configuration,()=>{resolve  ( new mssql.Request())})
})
}

module.exports={  connection}

