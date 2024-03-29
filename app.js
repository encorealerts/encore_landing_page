﻿global.rootRequire = function (name) {
  return require(__dirname + '/' + name);
};

global.__PORT = process.env.PORT || 3456;
global.__PRODUCTION = !!process.env.PORT;
global.__ROOT_PATH = __dirname;
global.__ASSETS_VERSION = process.env.ASSET_FILES_VERSION || 60;

// global.urlFor = function (path) {
//   if (__PRODUCTION) {
//     return 'https://s3.amazonaws.com/encore-landing-page' + path;
//   }
//   return path;
// }

var 
  express = require('express'),
  engine = require('ejs-locals'),
  compress = require('compression'),
  //cookieParser = require('cookie-parser'),
  //bodyParser = require('body-parser'),
  mime = require('mime'),
  app = express(),
  oneYear = 31556908800,
  assetManager = require('connect-assetmanager'),
  assetManagerGroups = rootRequire('others/assetManagerGroups');

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// compress + cache
app.use(compress({
  filter: function (req, res) {
    if (/\.woff|\.ttf|\.svg|\.eot/.test(req.url)){
      return false;
    }
    // fallback to standard filter function
    return compress.filter(req, res)  
  }  
}));
// minify + combine
app.use(assetManager(assetManagerGroups)); 
app.use(express.static(__dirname + '/public', {
  maxAge: __PRODUCTION ? oneYear : -1
}));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended:true }));
// app.use(bodyParser.json());
// mime types
mime.define({
  'font/opentype': ['otf'],
  'application/octet-stream': ['ttf'],
  'image/svg+xml': ['svg'],
  'application/vnd.ms-fontobject': ['eot'],
  'application/x-font-woff': ['woff']
});

// routes
app.get('/', function (req, res){
  res.render('index', {ip: req.connection.remoteAddress});
});

app.get('/sections/:id', function (req, res){
  res.render('sections/' + req.params.id);
});

app.listen(__PORT);
