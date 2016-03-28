module.exports = (function (){

  var oneYear = 31556908800;

  function handleAssetCache(req, res, response, callback){

    var headers = {
      'Last-Modified': response.modified,
      'Date': new Date().toUTCString(),
      'Cache-Control': 'public, max-age=' + (__PRODUCTION ? oneYear : -1),
      'Vary': 'Accept-Encoding'
    }

    if (req.headers['if-modified-since'] && Date.parse(req.headers['if-modified-since']) >= Date.parse(response.modified)) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    headers['Content-Encoding'] = response.encoding;
    headers['Content-Type'] = (function (url){
      if (/\.css/.test(url)){
        return 'text/css';
      } else if (/\.js/.test(url)){
        return 'application/javascript';
      }
    }(req.url));
    headers['Content-Length'] = response.contentLength;

    res.writeHead(200, headers);
    res.end(response.contentBuffer);
  }

  return {
    css: {
      route: new RegExp('encore\.' + __ASSETS_VERSION + '\.min\.css'),
      path: __ROOT_PATH + '/public/styles/',
      dataType: 'css',
      files: [ 
        'fonts/source-sans-pro/stylesheet.css',
        'landing-page.css'
      ],
      serveModify: handleAssetCache
    },
    js: {
      route: new RegExp('encore\.' + __ASSETS_VERSION + '\.min\.js'),
      path: __ROOT_PATH + '/public/scripts/',
      dataType: 'javascript',
      files: [ 
        'jquery-2.1.0.min.js',
        'jquery.easing.1.3.js',
        'landing-page.js'
      ],
      debug:!__PRODUCTION,
      serveModify: handleAssetCache
    }    
  };
}());
