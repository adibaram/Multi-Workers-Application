const express = require('express');
const cors = require('cors');
const session = require('express-session');

const router = require('./router');

const app = express();
const http = require('http').Server(app);

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true // enable set cookie
}));

app.use(session({
  secret: 'my app',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: 600000
  }
}))

app.use('', router);


app.use(express.static('public'));
  
  
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`app api listening on port ${PORT}`));
