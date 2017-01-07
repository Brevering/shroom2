const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  config = require('./server/config/database'), // get db config file
  User = require('./server/data/models/User'), // get the mongoose model
  PostModel = require('./server/data/models/post'),
  port = process.env.PORT || 3000,
  jwt = require('jwt-simple');

// Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");

  next();
});

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:3000)
// app.get('/', function (req, res) {
//   res.send('Hello! The API is at http://localhost:' + port + '/api');
// });

// connect to database
mongoose.connect(config.database);

// why do you need it 2 times ??
let UserModel = require('./server/data/models/User');
UserModel.init();


// pass passport for configuration
require('./server/config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

let usersController = require('./server/controllers/UsersController');
let postsController = require('./server/controllers/posts-controller');

apiRoutes.post('/signup', usersController.postRegister);
apiRoutes.post('/authenticate', usersController.postAuthenticate);
apiRoutes.get('/users', usersController.getAll);

apiRoutes.get('/profile/counts', usersController.getCounts);
apiRoutes.get('/profile/likes', usersController.getLikes);
apiRoutes.get('/profile/posts', usersController.getPosts);
apiRoutes.post('/profile/posts', usersController.addToUserPosts);
apiRoutes.put('/profile/posts', usersController.removeFromUserPosts);
apiRoutes.post('profile/update', passport.authenticate('jwt', { session: false }), usersController.updateUserProfile);


apiRoutes.get('/users/like', usersController.ifLiked);
apiRoutes.post('/users/like', usersController.addToUserLikes);
apiRoutes.post('/users/dislike', usersController.removeFromUserLikes);
apiRoutes.get('/users/:username', usersController.getUserInformation);
apiRoutes.post('/users/:username', usersController.updateUserProfile);



apiRoutes.get('/post/:id', postsController.getById);
apiRoutes.delete('/post/:id', postsController.markAsDeleted);
apiRoutes.get('/posts', postsController.get);
apiRoutes.post('/posts', postsController.create);

// connect the api routes under /api/*
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'dist')));

// Start the server
app.listen(port);
console.log('Server is active at:' + __dirname + port);
