const conn = require('../Connection/DB')


//Create User & Database

function SaveSignUp(req, res) {
    return new Promise(async function (resolve, reject) {

        var name = req.body.name
        var dob = req.body.dob
        var gender = req.body.gender
        var address = req.body.address
        var city = req.body.city
        var state = req.body.state
        var loginid = req.body.loginid
        var password = req.body.password

        conn.connection().then((conn) => {

            conn.query(`select * from employee where loginid=${loginid}`, function (err, results, fields) {
               
                if (results.length > 0) {
                    console.log("Login id & Password Already Exist");
                }
                else {
                    let qr = `insert into employee(name,dob,gender,address,city,state,loginid,password) VALUES('` + name + "','" + dob + "','" + gender + "','" + address + "','" + city + "','" + state + "','" + loginid + "','" + password + "')";
                    conn.query(qr, (err, result) => {
                        if (err)
                            reject(err.name + ':' + err.message)
                        console.log(err);
                        if (result) {
                            resolve({ success: true, message: 'User Added Successfully' })
                            console.log(result);
                            conn.query(`CREATE DATABASE ${loginid}`, function (err, r) {

                                if (err) {
                                        console.log(err);
                                }
                                else {
                                    console.log('DB Created:------',loginid);
                                }
                        })
                    }
                        resolve();
                    })
                }

            })
        })
    })
}



//Login

function SignIn(req, res) {
    return new Promise(async function (resolve, reject) {
    
    const { loginid, password } = req.body;
    var configuration= { 
        server:"DESKTOP-RN1VB5C",
        user:"sa",
        password:"OKPHARMA123",
        database:loginid,
        port:1433,
        options: {
            cryptoCredentialsDetails: {
                minVersion: 'TLSv1'
            },
            trustServerCertificate: true
        }
    };
    
    new mssql.connect(configuration,()=>{resolve  ( new mssql.Request())})
    
    

    conn.connection().then((conn) => {

    conn.query(`select * from employee where loginid=${loginid} and password=${password}`,
     function (err, results, fields) 
     {
        if (results.length > 0) {
                                res.send('welcome', loginid);
                                console.log('welcome', loginid);
                                resolve(results)
                                 }
        else {
            res.send(err);
            console.log(err);
            reject(err);
              }
            })
        })
    })
}

function logout (req, res) {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}


module.exports = {
    SaveSignUp,
    SignIn,
    logout

}