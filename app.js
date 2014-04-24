
var 
  express = require('express'),
  app = express(),
  assetManager = require('connect-assetmanager'),
	oneYear = 31556908800;
  mime = require('mime');

var assetManagerGroups = {
  'css': {
    'route': /\/static\/style\.css/,
    'path': __dirname + '/public/styles/',
    'dataType': 'css',
    'files': [ 'style.css' ]
  },
  'js': {
    'route': /\/static\/script\.js/,
    'path': __dirname + '/public/scripts/',
    'dataType': 'javascript',
    'files': [ 'jquery-2.1.-.min.js', 'jquery-ui-1.10.4.custom.min.js', 'script.js' ],
    'stale':!!process.env.PORT,
    'debug':!process.env.PORT
  },
};

app.configure(function (){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // minify + combine
  //app.use(assetManager(assetManagerGroups)); 
  // compress + cache
  app.use(express.compress());
  app.use(express.static(__dirname + '/public', {maxAge: 0}));
  // body parser
  app.use(express.bodyParser());
  // routes
  app.use(app.router);
  //mime types
  mime.define({
		'application/octet-stream': ['ttf'],
		'image/svg+xml': ['svg'],
		'application/vnd.ms-fontobject': ['eot'],
		'application/x-font-woff': ['woff']
  });
});

// routes
app.get('/', function (req, res){
  res.render('index');
});

app.listen(process.env.PORT || 3456);