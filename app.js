const express = require('express');

const port = process.env.PORT || 3000;
const app = express();


app.listen(port);
console.log(`imooc started port: ${port}`);

app.get('/views/index.html', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/views//detail', (req, res) => {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});
