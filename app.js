require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

const routes = require('./route');

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '64mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '64mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Use session
const secretKey = process.env.SECRET_KEY || 'secret_key';
app.use(session({
  secret: secretKey,
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl : 60*60 }),
  saveUninitialized: false,
  resave: false
}));


app.use(cors());

routes.init(app);

const server = http.createServer(app);

// Connect to mongoDB
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/posist';
const dbConfig = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose.connect(dbUrl, { ...dbConfig }, (err) => {
  if (err) {
    console.log('Error: Unable to connect with Database!');
  }
  else {
    console.log('Database connected!');
  }
});

// Start Server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;
