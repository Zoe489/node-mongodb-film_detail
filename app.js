const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

// post methhod test
// app.listen(port);
// const urlencodeParser = bodyParser.urlencoded({ extended: false });
// app.use(express.static('public'));
// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/views/index.html`);
// });
// app.post('/post_result', urlencodeParser, (req, res) => {
//   const response = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// });

// upload files
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp' }).array('image'));
app.listen(port);
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
const urlencodeParser = bodyParser.urlencoded({ extended: false });
app.post('/file_upload', urlencodeParser, (req, res) => {
  console.log(urlencodeParser);
  console.log(req.files[0]);
  // const desfile = __dirname + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, (err, data) => {
    fs.writeFile(`${__dirname}/${res.files[0].originalname}`, data, (err) => {
      if (err) {
        console.log(err);
      } else {
        const response = {
          message: 'File uploaded succeddfully',
          filename: req.files[0].originalname,
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
});
