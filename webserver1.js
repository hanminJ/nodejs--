// const mysql = require('mysql');  // mysql 모듈 로드
// const conn = mysql.createConnection({  // mysql 접속 설정
//     host: 'localhost',
//     user: 'root',
//     password: '0000',
//     database: 'node_db'
// });
// conn.connect();nodmo

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://test:<password>@cluster0.z953zx9.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   db = client.db('todoapp');
//   db.collection('post').insertOne( {todo : '냐옹', date : '2022-11-16'} , function(err, result){
//           console.log('저장완료'); 
//       });
//   client.close();
// });




const express = require('express')
const app = express()
const port = 8080
const bodyParser=require('body-parser')
const ejs = require('ejs')
const path = require('path'); 
app.use(bodyParser.urlencoded({extended:true}));//미들웨어

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));  

const MongoClient = require('mongodb').MongoClient;
var db; 
MongoClient.connect('mongodb+srv://test:0000@cluster0.z953zx9.mongodb.net/?retryWrites=true&w=majority', 
  function(err, client) {
  db = client.db('todoapp')




app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/webtoon', (req, res) => {
  res.send('웹툰서비스 망함')
})
app.get('/game', (req, res) => {
	res.send('Game 서비스 해주지 못해요')
})
app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html')
})
app.post('/add', (req, res) => {

  

      db.collection('counter').findOne({name:'Postcnt'}, function(err,result){
        var totalCount = result.totalPost;
      
      db.collection('post').insertOne({_id : totalCount+1 ,todo : req.body.title, date : req.body.date}, function(err,result) {
        if (err) {return console.log(err)}
      })
      db.collection('counter').updateOne({name: 'Postcnt'},{ $inc : {totalPost:1}}),function(err,result) {
        if (err) {return console.log(err)}
      };
})


// db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){ //DB.COUNTER 내의 총게시물갯수를 찾음
//   console.log(결과.totalPost) //총게시물갯수를 변수에 저장
//   var 총게시물갯수 = 결과.totalPost;

//   db.collection('post').insertOne({_id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date}, function(){ //이제 DB.post에 새게시글 기록함
//       console.log('저장완료');
//        //counter라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함 //updateMany //$set 바꿔주세요 //$inc 증가
//       db.collection('counter').updateOne({name : '게시물갯수'},{$inc : {totalPost:1} },function(에러, 결과){ //완료되면 DB.COUNTER 내의 총게시글 갯수 +  1
//           if(에러){return console.log(에러)}
//       })
//   });
// });


  res.send('전송완료');
}) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/list',function(req,res){
 
      db.collection('post').find().toArray(function(err,result){
        console.log(result);
        res.render('list', { DATA :result })
      });

  })

app.delete('/delete', function(req, res){
    
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body,function(err,result) {
      if (err) {return console.log(err)}
      console.log('삭제성공')
      
    })
    
    
  });