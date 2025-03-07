const express = require('express')
const app = express()
const port = 3000;
const client = require('./db/conn.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'uploads/')
  },
  filename: function (req,file,cb){
    cb(null, `${Date.now()}.${file.originalname}`)
  }
})

const upload = multer({storage:storage})

app.use(express.json());

app.get('/', (req, res) => {
  res.json({"message":'Hello World 213'})
});

app.get('/blogs', async (req, res) => {
  const result = await client.query('SELECT * from blogs');
  res.json({"data":result.rows[0]})
});

app.post('/blogs',async (req, res) => {
  const result = await client.query('INSERT INTO blogs (title,image,post) VALUES ($1,$2,$3)',[
    req.body.title,req.body.image,req.body.post
  ]);
  res.json({'message':'Added new blog',"desc":result.rowCount});
});

app.post('/blogimage', upload.single('file'), function (req,res,next) {
    res.json(req.file);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})