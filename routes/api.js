var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


router.get('/:lat/:lon', function(req, res, next) {
  const lat = req.params.lat;
  const lon = req.params.lon;
  let url = `https://api.darksky.net/forecast/${process.env.SECRET}/${lat},${lon}`;
  
  callAjax(url, function(data) {  
    res.send(data);
  });
    

})

router.get('/*', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Replace the latitude and longitude co-ordinates in this format ~/api/latitude/longitude');

})

module.exports = router;
