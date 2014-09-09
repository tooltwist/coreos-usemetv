var http = require('http');

var url = '128.199.190.70';
var port = 7070;
var path = '/v1-alpha/machines';

// http://128.199.190.70:7070/v1-alpha/machines
// http://128.199.190.70:7070/v1-alpha/machines

var options = {
  host: url,
  port: 7070,
  path: path,
  method: 'GET'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (data) {
    console.log('BODY: ', data);
	var obj = JSON.parse(data);
	console.log('obj=', obj)
  });
}).end();