// Create Web Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());

// Read comments from comments.json
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      return res.status(500).end(err.message);
    }

    res.json(JSON.parse(data));
  });
});

// Add comments to comments.json
app.post('/comments', (req, res) => {
  const newComment = req.body;

  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      return res.status(500).end(err.message);
    }

    const comments = JSON.parse(data);

    comments.push(newComment);

    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        return res.status(500).end(err.message);
      }

      res.json(newComment);
    });
  });
});

// Start Web Server
app.listen(3001, () => {
  console.log('Server is listening on http://localhost:3001');
});