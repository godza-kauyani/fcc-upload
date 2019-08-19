'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const storage = multer.memoryStorage()
const upload  = multer({ storage});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
    const result = {
		"filename":req.file.originalname,
		"size":req.file.size
	}
	res.json(result);
})

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Node.js listening ...on port ${PORT}`);
});
