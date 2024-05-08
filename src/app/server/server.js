// const express = require('express');
// const app = express();
// const port = 3306;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`)
// });

// const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3001;

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  db.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});