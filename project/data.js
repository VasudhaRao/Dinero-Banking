
// var express = require('express');
// var path = require('path');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/my_db";
// var port = process.env.PORT || 1520;
// var bodyParser = require('body-parser');
// var app = express();
// var formidable = require('formidable');
// app.set('view engine', 'pug')
// var router = express.Router();

// var jsonParser = bodyParser.json();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'app')));


// var cust1 = {_id:{cust_id:13312728, account_id:1222496542241313}, mail:"aishwaryaramaraj2998@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
// var cust2 = {_id:{cust_id:12216464, account_id:1222499056443567}, mail:"vasu.vasudha05@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
// var cust3=  {_id:{cust_id:53702338, account_id:1223891145506770}, mail:"chakradhargrandhi01@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
// var cust4 = {_id:{cust_id:33258000, account_id:1224446031123232}, mail:"glvcharan999@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};

// var customer1 = {_id:13312728, account_id:1222496542241313, ifsc:12225626268, cust_firstName:"Aishwarya", cust_lastName: "Ramaraj", acc_status: "NOA", last_login : "", phone_number:9655511680, mail: "aishwaryaramaraj2998@gmail.com", Address: "xyz", State:"Karnataka", password:""};
// var customer2 = {_id:12216464, account_id:1222499056443567, ifsc:12225626268, cust_firstName:"Vasudha", cust_lastName: "Achanta", acc_status: "NOA", last_login : "", phone_number:9610129289, mail: "vasu.vasudha05@gmail.com", Address: "abc", State:"Andhra Pradesh", password:""};
// var customer3 = {_id:53702338, account_id:1223891145506770, ifsc:12225626268, cust_firstName:"Chakradhar", cust_lastName: "Grandhi", acc_status: "NOA", last_login : "", phone_number:7538881212, mail: "chakradhargrandhi01@gmail.com", Address: "jkl", State:"Andhra Pradesh", password:"" };
// var customer4 = {_id:33258000, account_id:1224446031123232, ifsc:12225626268, cust_firstName:"Srijha", cust_lastName: "Kalyan", acc_status: "NOA", last_login : "", phone_number:7466123423, mail: "glvcharan999@gmail.com", Address: "pqr", State:"Tamil Nadu", password:"" };


// var loan1={_id:53702338 ,cust_firstName:"Chakradhar",cust_lastName: "Grandhi",amount:50000,status:"Pending"}
// var loan2={_id:12216464 ,cust_firstName:"Vasudha", cust_lastName: "Achanta",amount:50000,status:"Pending"}
// s
// var account1= {_id : 1222496542241313, ifsc:12225626268, acc_type : "Savings", balance_amount :20000, MPIN: "3096", card_number:"1234567461712342" };
// var account2= {_id : 1223891145506770, ifsc: 12225626268, acc_type : "Current", balance_amount :30000, MPIN: "3096", card_number:"2134678955614141" };
// var account3= {_id : 1224446031123232, ifsc: 12225626268, acc_type : "Current", balance_amount :40000, MPIN: "3096", card_number:"3122565674738898" };
// var account4= {_id : 1222499056443567, ifsc: 12225626268, acc_type : "Savings", balance_amount :50000, MPIN: "3096", card_number:"7721334521215537" };

// var transaction1 = {_id:1337908077775116, cust_id:13312728, account_id:1222496542241313, time_stamp:"Saturday, 2 February 2019, 18:55 P.M", to_account : 1223891145506770, tx_status:"Successful", tx_amount:5000 , cred_deb:"Credit"};


// var Branch1= {_id : 12225626268, Bank_name : "Dinero Bank New York", Bank_Address:"Wall Street, New York, 380006"};
// var Branch2= {_id : 12235626268, Bank_name : "Dinero Bank Boston", Bank_Address:"Brattle Street, Boston, 390006" };
// var Branch3= {_id : 12245626268, Bank_name : "Federal Bank", Bank_Address:"Harvard Square, Boston, 391006" };
// var Branch4= {_id : 12255626268, Bank_name : "Yes Bank", Bank_Address:"Commonwealth Avenue, New York, 381006"};

// var admin1 = {_id: 41301010, ifsc: 12225626268, admin_email:"glvcharan999@gmail.com", admin_password: "Test"};
// var bill1={_id:100001,name:"HP",amount:500};
// var bill2={_id:100002,name:"HP",amount:570};
// var bill3={_id:200001,name:"INDANE",amount:700};
//     var bill4={_id:200002,name:"INDANE",amount:870};
//     var bill5={_id:100003,name:"HP",amount:500};
//     var bill6={_id:100004,name:"HP",amount:570};
//     var bill7={_id:200003,name:"INDANE",amount:700};
//     var bill8={_id:200004,name:"INDANE",amount:870};
//     var bill9={_id:100005,name:"HP",amount:500};
//     var bill10={_id:100006,name:"HP",amount:570};
//     var bill11={_id:200005,name:"INDANE",amount:700};
//     var bill12={_id:200006,name:"INDANE",amount:870};
//     var ebill1={_id:100000001,name:"ANDHRA PRADESH",amount:300};
//     var ebill2={_id:100000002,name:"ANDHRA PRADESH",amount:1070};
//     var ebill3={_id:100000003,name:"ANDHRA PRADESH",amount:600};
//     var ebill4={_id:100000004,name:"ANDHRA PRADESH",amount:170};
//     var ebill5={_id:100000005,name:"ANDHRA PRADESH",amount:5060};
//     var ebill6={_id:100000006,name:"ANDHRA PRADESH",amount:1060};
//     var ebill7={_id:200000001,name:"TAMIL NADU",amount:600};
//     var ebill8={_id:200000002,name:"TAMIL NADU",amount:970};
//     var ebill9={_id:200000003,name:"TAMIL NADU",amount:690};
//     var ebill10={_id:200000004,name:"TAMIL NADU",amount:970};
//     var ebill11={_id:200000005,name:"TAMIL NADU",amount:600};
//     var ebill12={_id:200000006,name:"TAMIL NADU",amount:970};
//     var mbill1={_id:9491788394,name:"JIO",amount:300};
//     var mbill2={_id:9655511680,name:"AIRTEL",amount:1070};
//     var mbill3={_id:7339000592,name:"BSNL",amount:600};
//     var mbill4={_id:7538882663,name:"JIO",amount:170};
//     var mbill5={_id:9490831893,name:"AIRTEL",amount:5060};
//     var mbill6={_id:6281537224,name:"BSNL",amount:1060};
//     var mbill7={_id:9440754156,name:"JIO",amount:600};
//     var mbill8={_id:9440914599,name:"AIRTEL",amount:970};
//     var mbill9={_id:7538882245,name:"BSNL",amount:690};
//     var mbill10={_id:8850584901,name:"JIO",amount:970};
//     var mbill11={_id:7013779179,name:"AIRTEL",amount:630};
//     var mbill12={_id:9843440585,name:"BSNL",amount:970};
  


// MongoClient.connect(url,{useNewUrlParser: true } , function (err, db) {
//     if (err) throw err;
//     var mongo = db.db("mydb");
// mongo.collection("Branch").insertMany([Branch1, Branch2, Branch3, Branch4], function (err, res) {
//   if (err) throw err;
//   console.log("inserted");
//   db.close();
// });
// mongo.collection("Account").insertMany([account1, account2, account3, account4], function (err, res) {
//     if (err) throw err;
//     console.log("inserted");
//     db.close();
// });
// mongo.collection("Admin").insertMany([admin1], function (err, res) {
//     if (err) throw err;
//     console.log("inserted");
//     db.close();
//   });
// mongo.collection("Customers").insertMany([customer1, customer2, customer3, customer4], function (err, res) {
//     if (err) throw err;
//     console.log("inserted");
//     db.close();
//   });
// mongo.collection("Customer_access").insertMany([cust1, cust2, cust3, cust4], function (err, res) {

//     if (err) throw err;
//     console.log("inserted");
//     db.close();
//   });
//   mongo.collection("gas").insertMany([bill1,bill2,bill3,bill4,bill5,bill6,bill7,bill8,bill9,bill10,bill11,bill12], function (err, res) {
//     if (err) throw err;
//     console.log("inserted");
//     db.close();
//     });
//     mongo.collection("electricity").insertMany([ebill1,ebill2,ebill3,ebill4,ebill5,ebill6,ebill7,ebill8,ebill9,ebill10,ebill11,ebill12], function (err, res) {
//       if (err) throw err;
//       console.log("inserted");
//       db.close();
//   });
//   mongo.collection("mobile").insertMany([mbill1,mbill2,mbill3,mbill4,mbill5,mbill6,mbill7,mbill8,mbill9,mbill10,mbill11,mbill12], function (err, res) {
//     if (err) throw err;
//     console.log("inserted");
//     db.close();
// })


// });
var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/my_db";
var port = process.env.PORT || 1520;
var bodyParser = require('body-parser');
var app = express();
var formidable = require('formidable');
app.set('view engine', 'pug')
var router = express.Router();

var jsonParser = bodyParser.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app')));


var cust1 = {_id:{cust_id:13312728, account_id:1222496542241313}, mail:"aishwaryaramaraj2998@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
var cust2 = {_id:{cust_id:12216464, account_id:1222499056443567}, mail:"vasu.vasudha05@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
var cust3=  {_id:{cust_id:53702338, account_id:1223891145506770}, mail:"chakradhargrandhi01@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
var cust4 = {_id:{cust_id:33258000, account_id:1224446031123232}, mail:"glvcharan999@gmail.com", password:"", acc_status: "NOA", unsuccessful_login:0};
var loan1={_id:53702338 ,cust_firstName:"Chakradhar",cust_lastName: "Grandhi",amount:50000,status:"Pending"}
var loan2={_id:12216464 ,cust_firstName:"Vasudha", cust_lastName: "Achanta",amount:50000,status:"Pending"}

var customer1 = {_id:13312728, account_id:1222496542241313, ifsc:12225626268, cust_firstName:"Aishwarya", cust_lastName: "Ramaraj", acc_status: "NOA", last_login : "", phone_number:9655511680, mail: "aishwaryaramaraj2998@gmail.com", Address: "xyz", State:"Karnataka", password:""};
var customer2 = {_id:12216464, account_id:1222499056443567, ifsc:12225626268, cust_firstName:"Vasudha", cust_lastName: "Achanta", acc_status: "NOA", last_login : "", phone_number:9610129289, mail: "vasu.vasudha05@gmail.com", Address: "abc", State:"Andhra Pradesh", password:""};
var customer3 = {_id:53702338, account_id:1223891145506770, ifsc:12225626268, cust_firstName:"Chakradhar", cust_lastName: "Grandhi", acc_status: "NOA", last_login : "", phone_number:7538881212, mail: "chakradhargrandhi01@gmail.com", Address: "jkl", State:"Andhra Pradesh", password:"" };
var customer4 = {_id:33258000, account_id:1224446031123232, ifsc:12225626268, cust_firstName:"Srijha", cust_lastName: "Kalyan", acc_status: "NOA", last_login : "", phone_number:7466123423, mail: "glvcharan999@gmail.com", Address: "pqr", State:"Tamil Nadu", password:"" };

var account1= {_id : 1222496542241313, ifsc:12225626268, acc_type : "Savings", balance_amount :20000, MPIN: "3096", card_number:"1234567461712342" };
var account2= {_id : 1223891145506770, ifsc: 12225626268, acc_type : "Current", balance_amount :30000, MPIN: "3096", card_number:"2134678955614141" };
var account3= {_id : 1224446031123232, ifsc: 12225626268, acc_type : "Current", balance_amount :40000, MPIN: "3096", card_number:"3122565674738898" };
var account4= {_id : 1222499056443567, ifsc: 12225626268, acc_type : "Savings", balance_amount :50000, MPIN: "3096", card_number:"7721334521215537" };

var transaction1 = {_id:1337908077775116, cust_id:13312728, account_id:1222496542241313, time_stamp:"Saturday, 2 February 2019, 18:55 P.M", to_account : 1223891145506770, tx_status:"Successful", tx_amount:5000 , cred_deb:"Credit"};


var Branch1= {_id : 12225626268, Bank_name : "Dinero Bank New York", Bank_Address:"Wall Street, New York, 380006"};
var Branch2= {_id : 12235626268, Bank_name : "Dinero Bank Boston", Bank_Address:"Brattle Street, Boston, 390006" };
var Branch3= {_id : 12245626268, Bank_name : "Federal Bank", Bank_Address:"Harvard Square, Boston, 391006" };
var Branch4= {_id : 12255626268, Bank_name : "Yes Bank", Bank_Address:"Commonwealth Avenue, New York, 381006"};

var admin1 = {_id: 41301010, ifsc: 12225626268, admin_email:"glvcharan999@gmail.com", admin_password: "Test"};
var bill1={_id:100001,name:"HP",amount:500};
var bill2={_id:100002,name:"HP",amount:570};
var bill3={_id:200001,name:"INDANE",amount:700};
    var bill4={_id:200002,name:"INDANE",amount:870};
    var bill5={_id:100003,name:"HP",amount:500};
    var bill6={_id:100004,name:"HP",amount:570};
    var bill7={_id:200003,name:"INDANE",amount:700};
    var bill8={_id:200004,name:"INDANE",amount:870};
    var bill9={_id:100005,name:"HP",amount:500};
    var bill10={_id:100006,name:"HP",amount:570};
    var bill11={_id:200005,name:"INDANE",amount:700};
    var bill12={_id:200006,name:"INDANE",amount:870};
    var ebill1={_id:100000001,name:"ANDHRA PRADESH",amount:300};
    var ebill2={_id:100000002,name:"ANDHRA PRADESH",amount:1070};
    var ebill3={_id:100000003,name:"ANDHRA PRADESH",amount:600};
    var ebill4={_id:100000004,name:"ANDHRA PRADESH",amount:170};
    var ebill5={_id:100000005,name:"ANDHRA PRADESH",amount:5060};
    var ebill6={_id:100000006,name:"ANDHRA PRADESH",amount:1060};
    var ebill7={_id:200000001,name:"TAMIL NADU",amount:600};
    var ebill8={_id:200000002,name:"TAMIL NADU",amount:970};
    var ebill9={_id:200000003,name:"TAMIL NADU",amount:690};
    var ebill10={_id:200000004,name:"TAMIL NADU",amount:970};
    var ebill11={_id:200000005,name:"TAMIL NADU",amount:600};
    var ebill12={_id:200000006,name:"TAMIL NADU",amount:970};
    var mbill1={_id:9491788394,name:"JIO",amount:300};
    var mbill2={_id:9655511680,name:"AIRTEL",amount:1070};
    var mbill3={_id:7339000592,name:"BSNL",amount:600};
    var mbill4={_id:7538882663,name:"JIO",amount:170};
    var mbill5={_id:9490831893,name:"AIRTEL",amount:5060};
    var mbill6={_id:6281537224,name:"BSNL",amount:1060};
    var mbill7={_id:9440754156,name:"JIO",amount:600};
    var mbill8={_id:9440914599,name:"AIRTEL",amount:970};
    var mbill9={_id:7538882245,name:"BSNL",amount:690};
    var mbill10={_id:8850584901,name:"JIO",amount:970};
    var mbill11={_id:7013779179,name:"AIRTEL",amount:630};
    var mbill12={_id:9843440585,name:"BSNL",amount:970};
  


MongoClient.connect(url,{useNewUrlParser: true } , function (err, db) {
    if (err) throw err;
    var mongo = db.db("mydb");
mongo.collection("Branch").insertMany([Branch1, Branch2, Branch3, Branch4], function (err, res) {
  if (err) throw err;
  console.log("inserted");
  db.close();
});
mongo.collection("Account").insertMany([account1, account2, account3, account4], function (err, res) {
    if (err) throw err;
    console.log("inserted");
    db.close();
});
mongo.collection("Admin").insertMany([admin1], function (err, res) {
    if (err) throw err;
    console.log("inserted");
    db.close();
  });
  // mongo.collection("Loan").insertMany([loan1,loan2], function (err, res) {
  //   if (err) throw err;
  //   console.log("inserted");
  //   db.close();
  // });
mongo.collection("Customers").insertMany([customer1, customer2, customer3, customer4], function (err, res) {
    if (err) throw err;
    console.log("inserted");
    db.close();
  });
mongo.collection("Customer_access").insertMany([cust1, cust2, cust3, cust4], function (err, res) {

    if (err) throw err;
    console.log("inserted");
    db.close();
  });
  mongo.collection("gas").insertMany([bill1,bill2,bill3,bill4,bill5,bill6,bill7,bill8,bill9,bill10,bill11,bill12], function (err, res) {
    if (err) throw err;
    console.log("inserted");
    db.close();
    });
    mongo.collection("electricity").insertMany([ebill1,ebill2,ebill3,ebill4,ebill5,ebill6,ebill7,ebill8,ebill9,ebill10,ebill11,ebill12], function (err, res) {
      if (err) throw err;
      console.log("inserted");
      db.close();
  });
  mongo.collection("mobile").insertMany([mbill1,mbill2,mbill3,mbill4,mbill5,mbill6,mbill7,mbill8,mbill9,mbill10,mbill11,mbill12], function (err, res) {
    if (err) throw err;
    console.log("inserted");
    db.close();
})


});