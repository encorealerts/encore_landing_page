
var 
  express = require('express'),
  app = express(),
  assetManager = require('connect-assetmanager'),
  oneYear = 31556908800,
  production = !!process.env.PORT,
  mime = require('mime');

var assetManagerGroups = {
  'css': {
    'route': /\/encore\.min\.css/,
    'path': __dirname + '/public/styles/',
    'dataType': 'css',
    'files': [ 
      'fonts/proxima-nova/stylesheet.css', 
      'fonts/roboto-slab/stylesheet.css',
      'encore.css'
    ]
  },
  'js': {
    'route': /\/encore\.min\.js/,
    'path': __dirname + '/public/scripts/',
    'dataType': 'javascript',
    'files': [ 
      //'hubspot.js', 
      'jquery-2.1.0.min.js', 
      'funnel-animation.js',
      'encore.js' 
    ],
    'stale':!!production,
    'debug':!production
  }
};

app.configure(function (){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // minify + combine
  app.use(assetManager(assetManagerGroups)); 
  // compress + cache
  app.use(express.compress());

  app.use(function (req, res, next) { 
    if (/images\/|styles\/|scripts\//.test(req.url)) {
      res.setHeader('Cache-Control', 'public, max-age=' + oneYear);
      res.setHeader('Expires', new Date(Date.now() + oneYear).toUTCString());
    }
    return next();
  });

  app.use(express.static(__dirname + '/public', {maxAge: oneYear}));

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
  res.render('index', {production: production});
});

if (process.env.PORT && process.env.DYNO){
  app.listen(process.env.PORT);
} else {
  // amazon and localhost
  app.listen(3456);
}
