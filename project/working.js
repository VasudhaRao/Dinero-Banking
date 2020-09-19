var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/my_db";
var port = process.env.PORT || 1520;
var bodyParser = require('body-parser');
var app = express();
var formidable = require('formidable');
var nodemailer = require('nodemailer');
var generator = require('generate-password');
app.set('view engine', 'pug')
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dinerobanking@gmail.com',
        pass: 'qwaszx12345678'
    }

});

var jsonParser = bodyParser.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.render('Mainpage');
}
);

app.post('/initialserver', function (req, res) {
    res.render('initial');
});
app.post('/resetpass', function (req, res) {
    res.render('resetpassword.pug');
});
app.post('/resetmpin', function (req, res) {
    res.render('resetmpin.pug');
});


app.post('https://script.google.com/macros/s/AKfycbyvunbwnNzLk6ORbeyWYJfFHx-ZGgK1l0A3AT0nCA/exec', function (req, res) {
    console.log("hioii");
    res.redirect('/UserHomePage');
});
var cid, aid, m, ifsc, email, user;
app.post('/f1', function (req, res) {

    console.log("in main page");
    var button = req.body.register;
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "register") {




        }



    });

    res.render('f1');
    res.send();

});

app.post('/login', function (req, res) {

    console.log("in main page");
    var button = req.body.gologin;
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "Login") {




        }



    });



    res.render('userlogin.pug');

});



app.post('/confirm', function (req, res) {


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log("connected");
        var choice = req.body.opt;
        console.log(choice);
        console.log("12333333")
        var result;
        console.log("signup");
        cid = parseInt(req.body.custid);
        aid = parseInt(req.body.accno);
        m = req.body.mail;
        console.log(m)

        var mongo = db.db("mydb");
        console.log(cid);
        console.log(aid);
        console.log(m);
        mongo.collection("Customer_access").find({ "_id": { "cust_id": cid, "account_id": aid }, "mail": m }).toArray(function (err, result) {
            if (err) throw err;
            console.log(m);
            console.log(result);
            if (result.length == 0) {
                console.log("closing")
                resmsg = "Account doesnt exist.please try again";
                res.render('f1', { message: resmsg });
                db.close();
            }

            else {
                if (result[0].acc_status == 'NOA') {
                    console.log("data exists");

                    var generator = require('generate-password');
                    var randompassword = generator.generate({
                        length: 15,
                        numbers: true
                    });
                    destmail = m
                    console.log(m)
                    console.log(randompassword)

                    mongo.collection("Customer_access").findOneAndUpdate(
                        { _id: { "cust_id": cid, "account_id": aid } },
                        { $set: { "password": randompassword } }
                    );



                    var mailoptions = {
                        from: 'dinerobanking@gmail.com',
                        to: destmail,
                        subject: 'Password',
                        text: randompassword
                    };
                    transporter.sendMail(mailoptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent' + info.response);
                        }
                    });









                    db.close();
                    res.render('confirm');

                }
                else {
                    console.log('hurrah');
                    resmsg = "Account already exists. Try logging in";
                    res.render('f1', { message: resmsg });

                }
            }

            db.close();
        });


        var datetime = new Date();
        console.log(datetime);



    });

});
app.post('/checkreset', function (req, res) {


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log("connected");
        var choice = req.body.opt;
        console.log(choice);
        var result;
        console.log("Resetpassword");
        var initpass =req.body.accno;
        var newpass = req.body.custid;
        var confirmpass = req.body.mail;
        var mongo = db.db("mydb");
        mongo.collection("Customer_access").find({ "_id": { "cust_id": cid, "account_id": aid }, "password": initpass }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result.length == 0) {
                console.log("closing")
                var resmess = "Details doesnt match .please try again";
                res.render('usermain.pug', { message: resmsg });
                db.close();
            }

            else {
                if(newpass==confirmpass){
                    mongo.collection("Customer_access").findOneAndUpdate(
                        { password: initpass },
                        { $set: { "password": newpass } }
                    );
                    mongo.collection("Customers").findOneAndUpdate(
                        { password: initpass },
                        { $set: { "password": newpass } }
                    );
                    var resmess="Password Changed successfully"
                    res.render('usermain.pug',{message:resmess})


                }
                else{
                    var resmess="Details Incorrect"
                    res.render('usermain.pug',{message:resmess})

                }
            }

            db.close();
        });


        var datetime = new Date();
        console.log(datetime);



    });

});
app.post('/checkresetmpin', function (req, res) {


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log("connected");
        var choice = req.body.opt;
        console.log(choice);
        var result;
        console.log("ResetMPIN");
        var initpass =req.body.accno;
        var newpass = req.body.custid;
        var confirmpass = req.body.mail;
        var mongo = db.db("mydb");
        mongo.collection("Account").find({ "_id": aid, "MPIN": initpass }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result.length == 0) {
                console.log("closing")
                var resmess = "Details doesnt match .please try again";
                res.render('usermain.pug', { message: resmess });
                db.close();
            }

            else {
                if(newpass==confirmpass){
                    mongo.collection("Account").findOneAndUpdate(
                        { MPIN: initpass },
                        { $set: { "MPIN": newpass } }
                    );
                    var resmess="MPIN Changed successfully"
                    res.render('usermain.pug',{message:resmess})


                }
                else{
                    var resmess="Details Incorrect"
                    res.render('usermain.pug',{message:resmess})

                }
            }

            db.close();
        });


        var datetime = new Date();
        console.log(datetime);



    });

});


var r1;
app.post('/finalregister', function (req, res) {
    console.log("jjjj");
    console.log(cid);
    var button = req.body.delete;



    //console.log(button);


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "submit") {
            var mongo = db.db("mydb");
            var checkpasword = req.body.psw;
            console.log(checkpasword);
            mongo.collection("Customer_access").find({ _id: { "cust_id": cid, "account_id": aid } }).toArray(function (err, result) {
                //console.log(resu+"k");
                if (err) throw err;
                if (result.length == 0) {
                    console.log("Error in finding the account");
                }
                else {
                    var rndmpassword = result[0].password
                    console.log(rndmpassword);
                    console.log("this is the password stored in the database")
                    if (checkpasword == rndmpassword) {
                        console.log("passwords matched")
                    }
                    console.log("aszxaszx");


                }
            });



        }



    });
    res.render('finalregister');
});


app.post('/f2', function (req, res) {
    console.log('going here')
    var button = req.body.register;

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "register") {
            console.log("going inside");
            var mongo = db.db("mydb");
            var pw1 = req.body.pswrd;
            var pw2 = req.body.pswrd2;
            console.log("password is");
            console.log(pw1);
            console.log(pw2);
            if (pw1 == pw2) {
                mongo.collection("Customer_access").findOneAndUpdate(
                    { _id: { "cust_id": cid, "account_id": aid } },
                    {
                        $set: {
                            "password": pw1
                        }
                    }
                );
                mongo.collection("Customer_access").findOneAndUpdate(
                    { _id: { "cust_id": cid, "account_id": aid } },
                    {
                        $set: {
                            "acc_status": "Active"
                        }
                    }
                );

                mongo.collection("Customers").findOneAndUpdate(
                    { _id: cid },
                    {
                        $set: {
                            "acc_status": "Active"
                        }
                    }
                );

                mongo.collection("Customers").findOneAndUpdate(
                    { _id: cid, "account_id": aid },
                    {
                        $set: {
                            "password": pw1
                        }
                    }
                );
                email = m;
                mongo.collection("Account").find({ _id: aid }).toArray(function (err, result) {
                    //console.log(resu+"k");
                    if (err) throw err;
                    if (result.length == 0) {
                        console.log("Error in finding the account");
                    }
                    else {
                        ifsc = result[0].ifsc;
                        console.log("this is the password stored in the database")
                      
                        console.log("aszxaszx");


                    }
                });

                var mailoptions = {
                    from: 'dinerobanking@gmail.com',
                    to: email,
                    subject: 'Password',
                    text: 'Your account has been successfully registered'
                };
                transporter.sendMail(mailoptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent' + info.response);
                    }
                });

            }


        }


    });
    res.render('usermain.pug');
});





// app.post('/f2/main', function (req, res) {

//   var button=req.body.logging;


//   MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     console.log("logging entered")
//     if (err) throw err;
//     if (button == "logging") {
//       console.log("entering login module")
//       var cusid=  parseInt(req.body.userid);
//       var pass=req.body.pwd;

// mongo.collection("Customers").find({_id: cusid, "password": pass}).toArray(function (err, result) {
//   //console.log(resu+"k");
//   console.log(result)
//   if (err) throw err;
//   if (result.length == 0) {
//     console.log("Invalid Credentials");
//   }
//   else {
//     console.log("login success")


//   }
// });




//     }


//   });
//   res.render('f2');
// });
app.post('/try', function (req, res) {
    var button = req.body.logging;
    console.log(button);


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "logging") {
            console.log('yayyyyy');
            var cusid = parseInt(req.body.userid);
            var pwd = req.body.pwd;
            var mongo = db.db("mydb");
            console.log(cusid);
            console.log(pwd);
            mongo.collection("Customers").find({ _id: cusid, "password": pwd }).toArray(function (err, result) {
                //console.log(resu+"k");
                console.log(result)
                if (err) throw err;
                if (result.length == 0) {
                    mongo.collection("Customers").find({ _id: cusid}).toArray(function (err, checkresult) {
                        if(checkresult.length==0){
                            console.log("Invalid Credentials");
        
                            var resmsg = "Invalid credentials";
                            res.render('userlogin.pug', { message: resmsg });
 
                            
                        }
                        else{
                            console.log("asdfg");
        
                            var resmsg = "Invalid credentials";
                            res.render('userlogin.pug', { message: resmsg });

                        }


                    });

                    
                    // console.log("Invalid Credentials");

                    // var resmsg = "Invalid credentials";
                    // res.render('userlogin.pug', { message: resmsg });
                }
                else {
                    console.log("login success");
                    cid = cusid;
                    aid = result[0].account_id;
                    ifsc = parseInt(result[0].ifsc);
                    console.log("ifsc");
                    console.log(ifsc);
                    email = result[0].mail;
                    var accid=result[0].account_id;
                    console.log(email);
                    console.log(accid)
                    mongo.collection("Account").find({ _id: accid}).toArray(function (err, result) {
                        
                    res.render('usermain.pug',{ message: result.cust_firstName});


                    });

                }
            });
        }
        // if (button == "register") {
        //   console.log("going inside");
        //   var mongo = db.db("mydb");
        //   var pw1 = req.body.pswrd ;
        //   var pw2 = req.body.pswrd2 ;
        //   console.log("password is");
        //   console.log(pw1);
        //   console.log(pw2);
        //   if(pw1==pw2){
        //     mongo.collection("Customer_access").findOneAndUpdate(
        //       { _id: { "cust_id": cid, "account_id": aid } },
        //       { $set: { "password": pw1 
        //      } }
        //     );
        //     mongo.collection("Customer_access").findOneAndUpdate(
        //       { _id: { "cust_id": cid, "account_id": aid } },
        //       { $set: { "acc_status": "Active"
        //      } }
        //     );

        //     mongo.collection("Customers").findOneAndUpdate(
        //       { _id: cid, "account_id": aid  },
        //       { $set: { "password": pw1
        //      } }
        //     );

        //   }


        // }


    });
});

app.post('/t1', function (req, res) {
    res.render('t1');
}
)


app.get('/t2', function (req, res) {
    res.render('t2');
}
)

app.get('/t3', function (req, res) {
    res.render('t3');
}
)

app.get('/t4', function (req, res) {
    res.render('t4');
}
)

app.post('/t6/same', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log(aid+"hhhhh")
        var mongo = db.db("mydb");

        var ac = parseInt(req.body.accno);
        console.log(ifsc);
        console.log(ac);
        console.log(parseInt(req.body.amount));
        if (parseInt(req.body.amount) < 50000) {
            mongo.collection("Account").find({ _id: ac, ifsc: ifsc }).toArray(function (err, result) {
                //console.log(resu+"k");
                if (err) throw err;
                if (result.length == 0) {
                    console.log("cant find account");
                    var msg = "Invalid Account Number.";
                    //res.send("Invalid login");
                    res.render('t2', { message: msg });


                }
                else {
                    //next();
                    console.log(aid);
                    mongo.collection("Account").find({ _id: aid }).toArray(function (err, result2) {
                        //console.log(resu+"k");
                        if (err) throw err;
                        console.log(user);
                        console.log(result2.length);
                        console.log(result2[0].balance_amount);
                        console.log(req.body.amount);
                        var accbal = parseInt(result2[0].balance_amount);
                        var sendamt = parseInt(req.body.amount);
                        var accmpin = parseInt(result2[0].MPIN);
                        var sendmpin = parseInt(req.body.mpin);
                        if (sendamt > accbal) {
                            console.log("insufficient balance");
                            var msg = "Insufficient Funds.";
                            res.render('t2', { message: msg });
                            //db.close();
                        }
                        else {
                            if (accmpin == sendmpin) {
                                //accbal=accbal+sendamt;
                                //updating receivers amount
                                mongo.collection("Account").findOneAndUpdate(
                                    { _id: ac },
                                    { $inc: { "balance_amount": sendamt } }
                                );

                                //updating senders amount
                                //1223891145506770
                                console.log(aid);

                                mongo.collection("Account").findOneAndUpdate(
                                    { _id: aid },
                                    { $inc: { "balance_amount": -sendamt } }
                                );

                                //inserting in transaction table
                                var datetime = new Date();

                                var dayy = (datetime.getHours()) + ":" + (datetime.getMinutes()) + ":" + datetime.getSeconds();
                                //var dayy=datetime
                                var transaction1 = { from_account: aid, to_account: ac, tx_status: "Successful", tx_amount: sendamt, cred_deb: "Debit", date: datetime };
                                mongo.collection("Transaction").insertOne(transaction1, function (err, res) {
                                    if (err) throw err;
                                    console.log("inserted");
                                    db.close();
                                });

                                //mail sending to user debit

                                var mailoptions = {
                                    from: 'dinerobanking@gmail.com',
                                    to: email,
                                    subject: 'Money Debited',
                                    text: 'Money Successfully Debited \n\nTransaction Details: \nAccount:' + ac + '\n' + 'Amount:' + sendamt + '\n' + 'Remaining Balance:' + (accbal - sendamt) + '\n' + 'Time:' + datetime
                                };
                                transporter.sendMail(mailoptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log('Email sent' + info.response);
                                    }
                                });

                                //money crediting
                                var sendacc = mongo.collection("Customers").find({ account_id: ac }).toArray(function (err, result2) {
                                    //console.log(resu+"k");
                                    if (err) throw err;
                                    var sendaccmail = result2[0].mail;


                                    var mailoptions = {
                                        from: 'dinerobanking@gmail.com',
                                        to: sendaccmail,
                                        subject: 'Money Credited',
                                        text: 'Money Credited \n\nTransaction Details: \nAccount:' + aid + '\n' + 'Amount:' + sendamt + '\n' + 'Time:' + datetime
                                    };
                                    transporter.sendMail(mailoptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent' + info.response);
                                        }
                                    });

                                })


                                //checking for min balance and sending mail

                                if ((accbal - sendamt) <= 1000) {
                                    var mailoptions = {
                                        from: 'dinerobanking@gmail.com',
                                        to: sendaccmail,
                                        subject: 'Minimum Balance',
                                        text: 'Your Account has a balance less than minimum balance. \nRemaining Balance:' + (accbal - sendamt)
                                    };
                                    transporter.sendMail(mailoptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent' + info.response);
                                        }
                                    });

                                }





                                res.render('t6');
                            }

                            else {
                                var msg = "Invalid Credentials.";
                                res.render('t2', { message: msg });
                            }

                            //res.redirect('t2');
                        }
                    });

                }
            });

        }
        else {
            console.log("exceeding max transfer balance");
            var msg = "Funds Exceeded";
            res.render('t2', { message: msg });

        }


    });

}
)

app.post('/t6/diff', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var mongo = db.db("mydb");
        var ifsc1 = parseInt(req.body.ifsc);
        var ac = parseInt(req.body.accno);
        console.log(ac);
        console.log(ifsc1);

        if (parseInt(req.body.amount) < 50000) {
            mongo.collection("Account").find({ _id: ac, ifsc: ifsc1 }).toArray(function (err, result) {
                //console.log(resu+"k");
                if (err) throw err;
                if (result.length == 0) {
                    console.log("cant find account");
                    var msg = "Invalid Account Number.";
                    res.render('t3', { message: msg });
                }
                else {
                    mongo.collection("Account").find({ _id: aid }).toArray(function (err, result2) {
                        //console.log(resu+"k");
                        if (err) throw err;
                        console.log(result2[0].balance_amount);
                        console.log(req.body.amount);
                        var accbal = parseInt(result2[0].balance_amount);
                        var sendamt = parseInt(req.body.amount);
                        var accmpin = parseInt(result2[0].MPIN);
                        var sendmpin = parseInt(req.body.mpin);
                        if (sendamt > accbal) {
                            console.log("insufficient balance");
                            var msg = "Insufficient Funds";
                            res.render('t3', { message: msg });
                            db.close();
                        }
                        else {
                            if (accmpin == sendmpin) {
                                //accbal=accbal+sendamt;
                                //updating receivers amount
                                console.log(sendamt);
                                mongo.collection("Account").findOneAndUpdate(
                                    { _id: ac },
                                    { $inc: { "balance_amount": sendamt } }
                                );

                                //updating senders amount
                                ///1223891145506770

                                mongo.collection("Account").findOneAndUpdate(
                                    { _id: aid },
                                    { $inc: { "balance_amount": -sendamt } }
                                );

                                //inserting in transaction table

                                var datetime = new Date();

                                var dayy = (datetime.getHours()) + ":" + (datetime.getMinutes()) + ":" + datetime.getSeconds();

                                var transaction1 = { from_account: cid, to_account: ac, tx_status: "Successful", tx_amount: sendamt, cred_deb: "Debit", date: datetime };
                                mongo.collection("Transaction").insertOne(transaction1, function (err, res) {
                                    if (err) throw err;
                                    console.log("inserted");
                                    db.close();
                                });


                                //mail sending to user debit

                                var mailoptions = {
                                    from: 'dinerobanking@gmail.com',
                                    to: email,
                                    subject: 'Money Debited',
                                    text: 'Money Successfully Debited \n\nTransaction Details: \nAccount:' + ac + '\n' + 'Amount:' + sendamt + '\n' + 'Remaining Balance:' + (accbal - sendamt) + '\n' + 'Time:' + datetime
                                };
                                transporter.sendMail(mailoptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log('Email sent' + info.response);
                                    }
                                });

                                //money crediting
                                var sendacc = mongo.collection("Customers").find({ account_id: ac }).toArray(function (err, result2) {
                                    //console.log(resu+"k");
                                    if (err) throw err;
                                    var sendaccmail = result2[0].mail;


                                    var mailoptions = {
                                        from: 'dinerobanking@gmail.com',
                                        to: sendaccmail,
                                        subject: 'Money Credited',
                                        text: 'Money Credited \n\nTransaction Details: \nAccount:' + aid + '\n' + 'Amount:' + sendamt + '\n' + 'Time:' + datetime
                                    };
                                    transporter.sendMail(mailoptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent' + info.response);
                                        }
                                    });

                                })

                                //checking for min balance and sending mail

                                if ((accbal - sendamt) <= 1000) {
                                    var mailoptions = {
                                        from: 'dinerobanking@gmail.com',
                                        to: sendaccmail,
                                        subject: 'Minimum Balance',
                                        text: 'Your Account has a balance less than minimum balance. \nRemaining Balance:' + (accbal - sendamt)
                                    };
                                    transporter.sendMail(mailoptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent' + info.response);
                                        }
                                    });

                                }
                                res.render('t6');

                            }

                            else {
                                var msg = "Invalid Credentials.";
                                res.render('t3', { message: msg });
                            }
                            //res.redirect('t2');


                        }
                    });



                }
            });

        }
        else {
            console.log("exceeding max transfer balance");
            var msg = "Funds Exceeded";
            res.render('t2', { message: msg });

        }

    });

}
)



app.post('/t6/gas', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var mongo = db.db("mydb");
        //console.log(req.body.sub);
        var ac=aid;
        var cname = req.body.cname;//compname
        var billno = parseInt(req.body.billnum);
        var btype = req.body.btype;//bill type-mobile,elec,gas 
        console.log(billno);
        console.log(cname);
        console.log(btype);


        mongo.collection("gas").find({ _id: billno, name: cname }).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                var msg = "Bill Invalid";
                console.log("cant find bill");
                res.render('t4', { message: msg });
            }
            else {
                mongo.collection("Account").find({ _id: ac }).toArray(function (err, result2) {
                    if (err) throw err;
                    console.log("hhhh");
                    console.log(result2);
                    var sendamt = parseInt(result[0].amount);
                    var accbal = parseInt(result2[0].balance_amount);
                    var accmpin = parseInt(result2[0].MPIN);
                    var sendmpin = parseInt(req.body.mpin);
                    if (sendamt > accbal || sendamt == 0) {
                        var msg = "Insufficient Balance/Already Paid";
                        res.render('t4', { message: msg });
                        db.close();
                    }
                    else {
                        console.log(sendmpin);
                        if (accmpin == sendmpin) {
                            //accbal=accbal+sendamt;
                            //updating receivers amount
                            mongo.collection("gas").findOneAndUpdate(
                                { _id: billno },
                                { $inc: { "amount": -sendamt } }
                            );

                            //updating senders amount

                            mongo.collection("Account").findOneAndUpdate(
                                { _id: ac },
                                { $inc: { "balance_amount": -sendamt } }
                            );

                            //inserting in transaction table
                            var datetime = new Date();

                            var dayy = (datetime.getHours()) + ":" + (datetime.getMinutes()) + ":" + datetime.getSeconds();

                            var transaction1 = { from_account: ac, to_account: billno, tx_status: "Successful", tx_amount: sendamt, cred_deb: "Debit-Gas Bill", date: datetime };
                            mongo.collection("Transaction").insertOne(transaction1, function (err, res) {
                                if (err) throw err;
                                console.log("inserted");
                                db.close();
                            });

                            //mail sending to user debit

                            var mailoptions = {
                                from: 'dinerobanking@gmail.com',
                                to: email,
                                subject: 'Payment Successful-Gas',
                                text: 'Payment of Gas Successful \n\nTransaction Details: \n' + 'Amount:' + sendamt + '\n' + 'Remaining Balance:' + (accbal - sendamt) + '\n' + 'Time:' + datetime
                            };
                            transporter.sendMail(mailoptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Email sent' + info.response);
                                }
                            });
                        }
                        else {
                            var msg = "Invalid Credentials.";
                            res.render('t4', { message: msg });

                        }

                        //checking for min balance and sending mail

                        if ((accbal - sendamt) <= 1000) {
                            var mailoptions = {
                                from: 'dinerobanking@gmail.com',
                                to: sendaccmail,
                                subject: 'Minimum Balance',
                                text: 'Your Account has a balance less than minimum balance. \nRemaining Balance:' + (accbal - sendamt)
                            };
                            transporter.sendMail(mailoptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Email sent' + info.response);
                                }
                            });

                        }
                        res.render('t6');

                    }

                });

            }

        });
    });

})

app.post('/t6/electricity', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var mongo = db.db("mydb");
        //console.log(req.body.sub);
        
        var ac=aid;
        var cname = req.body.cname;//compname
        var billno = parseInt(req.body.billnum);
        //var btype = req.body.btype;//bill type-mobile,elec,gas 
        console.log(billno);
        console.log(cname);
        //console.log(btype);

        mongo.collection("electricity").find({ _id: billno, name: cname }).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            if (result.length == 0) {
                var msg = "Bill Invalid";
                res.render('t4', { message: msg });
            }
            else {
                mongo.collection("Account").find({ _id: ac }).toArray(function (err, result2) {
                    if (err) throw err;
                    var sendamt = parseInt(result[0].amount);
                    var accbal = parseInt(result2[0].balance_amount);
                    var accmpin = parseInt(result2[0].MPIN);
                    var sendmpin = parseInt(req.body.mpin);
                    if (sendamt > accbal) {
                        var msg = "Insufficient Balance/Already Paid";
                        res.render('t4', { message: msg });
                        db.close();
                    }
                    else {
                        if (accmpin == sendmpin) {
                            //accbal=accbal+sendamt;
                            //updating receivers amount
                            mongo.collection("electricity").findOneAndUpdate(
                                { _id: billno },
                                { $inc: { "amount": -sendamt } }
                            );

                            //updating senders amount

                            mongo.collection("Account").findOneAndUpdate(
                                { _id: ac },
                                { $inc: { "balance_amount": -sendamt } }
                            );

                            //inserting in transaction table
                            var datetime = new Date();

                            var dayy = (datetime.getHours()) + ":" + (datetime.getMinutes()) + ":" + datetime.getSeconds();

                            var transaction1 = { from_account: ac, to_account: billno, tx_status: "Successful", tx_amount: sendamt, cred_deb: "Debit-Electricty Bill", date: datetime };
                            mongo.collection("Transaction").insertOne(transaction1, function (err, res) {
                                if (err) throw err;
                                console.log("inserted");
                                db.close();
                            });

                            var mailoptions = {
                                from: 'dinerobanking@gmail.com',
                                to: email,
                                subject: 'Payment Successful-Electricity',
                                text: 'Payment of Electricity Successful \n\nTransaction Details: \n' + 'Amount:' + sendamt + '\n' + 'Remaining Balance:' + (accbal - sendamt) + '\n' + 'Time:' + datetime
                            };
                            transporter.sendMail(mailoptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Email sent' + info.response);
                                }
                            });

                            //checking for min balance and sending mail

                            if ((accbal - sendamt) <= 1000) {
                                var mailoptions = {
                                    from: 'dinerobanking@gmail.com',
                                    to: sendaccmail,
                                    subject: 'Minimum Balance',
                                    text: 'Your Account has a balance less than minimum balance. \nRemaining Balance:' + (accbal - sendamt)
                                };
                                transporter.sendMail(mailoptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log('Email sent' + info.response);
                                    }
                                });

                            }
                            res.render('t6');

                        }
                        else {
                            console.log("invalid");
                            var msg = "Invalid Credentials.";
                            res.render('t4', { message: msg });

                        }

                    }

                });

            }

        });
    })

})


app.post('/t6/mobile', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var mongo = db.db("mydb");

        //console.log(req.body.sub);
        var ac=aid;

        var cname = req.body.cname;//compname
        var mobile = parseInt(req.body.mobile);
        console.log(mobile+"jjj");
        console.log(mobile);
        //var billno = parseInt(req.body.billnum);
        //var btype = req.body.btype;//bill type-mobile,elec,gas 
        //console.log(billno);
        console.log(cname);

        mongo.collection("mobile").find({ _id: mobile, name: cname }).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                var msg = "Number Invalid";
                console.log("cant find number");
                res.render('t4', { message: msg });
            }
            else {
                mongo.collection("Account").find({ _id: ac }).toArray(function (err, result2) {
                    if (err) throw err;
                    var sendamt = parseInt(result[0].amount);
                    var accbal = parseInt(result2[0].balance_amount);
                    var accmpin = parseInt(result2[0].MPIN);
                    var sendmpin = parseInt(req.body.mpin);
                    if (sendamt > accbal) {
                        var msg = "Insufficient Balance/Already Paid";
                        res.render('t4', { message: msg });
                        db.close();
                    }
                    else {
                        if (accmpin == sendmpin) {
                            //accbal=accbal+sendamt;
                            //updating receivers amount
                            mongo.collection("mobile").findOneAndUpdate(
                                { _id: mobile },
                                { $inc: { "amount": -sendamt } }
                            );

                            //updating senders amount

                            mongo.collection("Account").findOneAndUpdate(
                                { _id: ac },
                                { $inc: { "balance_amount": -sendamt } }
                            );

                            //inserting in transaction table
                            var datetime = new Date();

                            var dayy = (datetime.getHours()) + ":" + (datetime.getMinutes()) + ":" + datetime.getSeconds();

                            var transaction1 = { from_account: ac, to_account: mobile, tx_status: "Successful", tx_amount: sendamt, cred_deb: "Debit-Mobile Bill", date: datetime };
                            mongo.collection("Transaction").insertOne(transaction1, function (err, res) {
                                if (err) throw err;
                                console.log("inserted");
                                db.close();
                            });

                            //mail debit

                            var mailoptions = {
                                from: 'dinerobanking@gmail.com',
                                to: email,
                                subject: 'Payment Successful-Mobile',
                                text: 'Payment of Mobile Successful \n\nTransaction Details: \n' + 'Amount:' + sendamt + '\n' + 'Remaining Balance:' + (accbal - sendamt) + '\n' + 'Time:' + datetime
                            };
                            transporter.sendMail(mailoptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Email sent' + info.response);
                                }
                            });

                            //checking for min balance and sending mail

                            if ((accbal - sendamt) <= 1000) {
                                var mailoptions = {
                                    from: 'dinerobanking@gmail.com',
                                    to: sendaccmail,
                                    subject: 'Minimum Balance',
                                    text: 'Your Account has a balance less than minimum balance. \nRemaining Balance:' + (accbal - sendamt)
                                };
                                transporter.sendMail(mailoptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log('Email sent' + info.response);
                                    }
                                });

                            }
                            res.render('t6');
                        }
                        else {
                            var msg = "Invalid Credentials.";
                            res.render('t4', { message: msg });

                        }

                    }

                });

            }

        });

    })

})


app.get('/transaction_history', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        var mongo = db.db("mydb");

        mongo.collection("Transaction").find({ from_account: aid }).toArray(function (err, result) {
            mongo.collection("Transaction").find({ to_account: aid }).toArray(function (err, result1) {
                res.render('transaction_history', { result: result, result1: result1 });

            });
        })
    })


})



app.post('/adminside', function (req, res) {
    res.render('adminlogin.pug');
});
app.post('/userside', function (req, res) {
    res.render('initial.pug');
});
app.post('/service', function (req, res) {
    res.render('servicepage.pug');
});

app.post('/f_active', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({acc_status : 'Active'}).toArray(function (err, result) {
             if (err) throw err;
           
            res.render('viewdetails.pug', { 'result': result });

        });
    });
});
app.post('/f_inactive', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({acc_status : 'NOA'}).toArray(function (err, result) {
            if (err) throw err;
           
            res.render('viewdetails.pug', { 'result': result });

        });
    });
});

app.post('/request', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Loan").find({}).toArray(function (err, result) {
             if (err) throw err;
           
            res.render('loanrequests.pug', { 'result': result });

        });
    });
});
app.post('/changestatus', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({}).toArray(function (err, result) {
            if (err) throw err;
           
            res.render('details.pug', { 'result': result });

        });
    });
});
app.post('/block', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        console.log('went Inside');
        var id=parseInt(req.body.eid);
        console.log(id);
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({_id : id}).toArray(function (err, result) {
             if(result.length == 0){
                console.log('went here');
                var resmsg="Account doesnot exist";
                res.render('adminmain.pug', { 'message': resmsg });
            }
            else{
                if(result[0].acc_status=='Active'){
                    db.collection("Customer_access").findOneAndUpdate(
                        { _id: { "cust_id": id } },
                        { $set: { "acc_status": "Blocked"
                       } }
                      );
                      
                      db.collection("Customers").findOneAndUpdate(
                        { _id: id },
                        { $set: { "acc_status": "Blocked"
                       } }
                      );
                      var resmsg="Account Status Changed";
                      res.render('adminmain.pug', { 'message': resmsg });
                }
                else{
                    var resmsg="Blocking cannot be done for unregistered Account"
                    res.render('adminmain.pug',{'message':resmsg});

                }
            }

        });
    });
});
app.post('/unblock', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        console.log('went Inside');
        var id=parseInt(req.body.eid);
        console.log(id);
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({_id : id}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if(result.length == 0){
                console.log('went here');
                var resmsg="Account doesnot exist";
                res.render('adminmain.pug', { 'message': resmsg });
            }
            else{
                if(result[0].acc_status=='Blocked'){
                    db.collection("Customer_access").findOneAndUpdate(
                        { _id: { "cust_id": id } },
                        { $set: { "acc_status": "Active"
                       } }
                      );
                      
                      db.collection("Customers").findOneAndUpdate(
                        { _id: id },
                        { $set: { "acc_status": "Active"
                       } }
                      );
                      var resmsg="Account Status Changed";
                      res.render('adminmain.pug', { 'message': resmsg });
                   // res.render('page2.pug', {id: result[i].id, fname: result[i].fname, lname: result[i].lname, age: result[i].age, address: result[i].address, city: result[i].city, state: result[i].state, country: result[i].country, contact: result[i].contact});
                  //}
                }
                else if(result[0].acc_status=='Active'){
                    var resmsg="Cannot unblock Active account"
                    res.render('adminmain.pug',{'message':resmsg});

                }
                else{
                    var resmsg="Blocking cannot be done for unregistered Account"
                    res.render('adminmain.pug',{'message':resmsg});

                }
            }

        });
    });
});
app.post('/approve', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        console.log('went Inside');
        var id=parseInt(req.body.eid);
        console.log(id);
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Loan").find({_id : id}).toArray(function (err, result) {
            if(result.length == 0){
                console.log('went here');
                var resmsg="No loan request exists";
                res.render('adminmain.pug', { 'message': resmsg });
            }
            else{
                console.log(result[0].status)
                if(result[0].status=='Pending'){
                    db.collection("Loan").findOneAndUpdate(
                        { _id: id  },
                        { $set: { "status": "Approved"
                       } }
                      );
                      var resmsg="Loan Status Changed successfully";
                      res.render('adminmain.pug', { 'message': resmsg });
                }
                else if(result[0].status=='Approved'){
                    var resmsg="Request already approved"
                    res.render('adminmain.pug',{'message':resmsg});

                }
                else{
                    var resmsg="Blocking cannot be done for unregistered Account"
                    res.render('adminmain.pug',{'message':resmsg});

                }
            }

        });
    });
});
app.post('/reject', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        console.log('went Inside');
        var id=parseInt(req.body.eid);
        console.log(id);
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Loan").find({_id : id}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if(result.length == 0){
                console.log('went here');
                var resmsg="No loan request exists";
                res.render('adminmain.pug', { 'message': resmsg });
            }
            else{
                console.log(result[0].status)
                if(result[0].status=='Pending'){
                    db.collection("Loan").findOneAndUpdate(
                        { _id: id  },
                        { $set: { "status": "Rejected"
                       } }
                      );
                      var resmsg="Loan Status Changed successfully";
                      res.render('adminmain.pug', { 'message': resmsg });
                   // res.render('page2.pug', {id: result[i].id, fname: result[i].fname, lname: result[i].lname, age: result[i].age, address: result[i].address, city: result[i].city, state: result[i].state, country: result[i].country, contact: result[i].contact});
                  //}
                }
                else if(result[0].status=='Approved'){
                    var resmsg="Request already approved"
                    res.render('adminmain.pug',{'message':resmsg});

                }
                else{
                    var resmsg="Loan request is rejected changes cannot be made"
                    res.render('adminmain.pug',{'message':resmsg});

                }
            }

        });
    });
});

app.post('/transaction', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Transaction").find({}).toArray(function (err, result) {
            if (err) throw err;
           
            res.render('admin_transaction.pug', { 'result': result });

        });
    });
});


app.post('/logout', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        res.render('Mainpage.pug');
    });
});
app.post('/loanreq', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('mydb');
        if (err) throw err;
        db.collection("Customers").find({_id:cid}).toArray(function (err, result) {
            if (err) throw err;
            db.collection("Loan").find({_id:cid}).toArray(function (err, result1) {

                if (err) throw err;
                if(result1.length==0){
                   var loan={_id:cid ,cust_firstName:result[0].cust_firstName,cust_lastName: result[0].cust_lastName,status:"Pending"};
                   db.collection("Loan").insertOne(loan, function (err, res) {
                    if (err) throw err;
                    console.log("inserted");
                
              });
              resmsg="Request sent";
              res.render('usermain.pug',{message:resmsg});

            }
            else{
                resmsg="Request Already Sent";
                res.render('usermain.pug',{message:resmsg});
            }
         
            });



        });


        
    });
});




app.post('/enterdashboard', function (req, res) {
    var button = req.body.logging;
    console.log(button);


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        if (button == "logging") {
            console.log('yayyyyy');
            var cusid = parseInt(req.body.custid);
            var pwd = req.body.pwd;
            var mongo = db.db("mydb");
            console.log(cusid);
            console.log(pwd);
            mongo.collection("Admin").find({ _id: cusid, admin_password:pwd }).toArray(function (err, result) {
                //console.log(resu+"k");
                console.log(result)
                if (err) throw err;
                if (result.length == 0) {
                    console.log("Invalid Credentials");

                    var resmsg = "Invalid credentials";
                    res.render('adminlogin', { message: resmsg });
                }
                else {
                    console.log("login success");
                    res.render('adminmain.pug');


                }
            });
        }


    });
});
app.post('/statement', function (req, res) {
    // var d="Debited data:"+"\n";
     var data="Debited Data: \n     Account            Amount                                       Time&Date\n";
     var data1="Credited Data: \n     Account            Amount                                       Time&Date\n";
     var finaldata="";
     MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
         var mongo = db.db("mydb");
 
         mongo.collection("Transaction").find({ from_account: aid}).toArray(function (err, result) {
             /*data = "<style>\n" + "th,td{\n" + "border-collapse: collapse; background-color:#623B10\n" + "}\n" + "</style>" + '<table style=\"width:30%\">\n' + '<tr>' +
                 "<th>TO_ACCOUNT</th>\n" + "<th>TRANSACTION AMOUNT</th>\n" + "<th>CREDIT/DEBIT</th>\n" + "<th>DATE</th>\n" + "/<tr>";
             for (var i = 0; i < result.length; i++) {
                 data = data + '<tr><th>' + result[i].to_account + '<th>' + result[i].tx_amount + '<th>' + result[i].cred_deb + '<th>' + result[i].date + '<tr>' + "\n";
             }*/
 
             for (var i = 0; i < result.length; i++) {
                 data = data + result[i].to_account + '       ' + result[i].tx_amount +  '                     ' + result[i].date + ' ' + "\n";
                 //console.log(data);
             }
             //console.log(result);
 
             data=data+"\n";
             //console.log(result[0].to_account=);
             mongo.collection("Transaction").find({ to_account: aid }).toArray(function (err, result1) {
                 
                 for (var i = 0; i < result1.length; i++) {
                     data1 = data1 + result1[i].from_account + '       ' + result1[i].tx_amount + '                    ' + result1[i].date + ' ' + "\n";
                 }
                 //console.log(data1+" "+data+"k");
                 finaldata=data+data1;
                 console.log(finaldata);
                 res.render('usermain.pug',{message:"Mail is sent to your account"});
 
                 var transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                         user: 'dinerobanking@gmail.com',
                         pass: 'qwaszx12345678'
                     }
     
                 });
                 var mailoptions = {
                     from: 'dinerobanking@gmail.com',
                     to: email,
                     subject: 'test',
                     text: finaldata
                 };
                 transporter.sendMail(mailoptions, function (error, info) {
                     if (error) {
                         console.log(error);
                     }
                     else {
                         console.log('Email sent' + info.response);

                         
                     }
                 });
                
             });
             
              
            // console.log(finaldata);
 
             
 
 
 
         });
 
         
 
 
 
     });
     var addd="Message successfully sent"
     res.render('usermain');
 
 }
 )

app.listen(1520, function () {
    console.log('app listening')
});