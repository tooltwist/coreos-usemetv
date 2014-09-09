var http = require('http');


exports.getMachines = function(callback){
	// 128.199.145.55:4194/api/v1.1/containers/
	var url = '128.199.145.55';
	var port = 4194;
	var path = '/api/v1.1/containers/';

	// http://128.199.190.70:7070/v1-alpha/machines
	// http://128.199.190.70:7070/v1-alpha/machines

	var options = {
	  hostname: url,
	  port: port,
	  path: path,
	  method: 'GET'
	};

	var data = '';
	var numChunks = 0;
	http.request(options, function(res) {
	  // console.log('STATUS: ' + res.statusCode);
	  
	  if (res.statusCode != 200) {
		  return callback(new Error('Could not get machine list from discovery URL. Status code=' + res.statusCode))
	  }
	  
	  // console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    // console.log('BODY: ', chunk);
		data += chunk;
		numChunks++
	  });
	  res.on('error', function(){
		  console.log('ERROR')
		  return callback(new Error('Error contacting discovery URL: ' + err), null)
	  })
	  res.on('end', function(){
			// console.log('\n\n\n\nAT END\n\n\n\n')
			var obj = JSON.parse(data);
			// console.log('\n\n\nOBJ=', obj)
			
//			delete obj['stats'];
// obj.stats = 'abc';
var last = obj.stats[obj.stats.length-1]
obj.stats = [ last ];
obj.samples = 'abc';
	
			var json = JSON.stringify(obj, null, 4)
			console.log('\n\n\nJSON=' + json)
	
    		  /*
			var machines = obj.node.nodes;
			// console.log('-> ' + machines.length + ' nodes')
			var list = [];
			for (var i = 0; i < machines.length; i++) {
				var id = machines[i].key;
				var value = machines[i].value;
				// console.log(id + ':' + value)
				
				// Get the id
				var ID_PREFIX = '/_etcd/registry/'
				if (id.substring(0, ID_PREFIX.length) !== ID_PREFIX){
					
					// Invalid prefix
					console.log('Invalid prefix: ignoring ' + id)
					continue;
				} else {
					
					// All ok
					var machineId = id.substring(ID_PREFIX.length)
					// console.log('ipaddr=' + ipaddr + '<')
				}
		
				// Get the ip address
				var PREFIX = 'http://'
				var SUFFIX = ':7001'
				if (value.substring(0, PREFIX.length) !== PREFIX){
					
					// Invalid prefix
					console.log('Invalid prefix: ignoring ' + value)
					continue;
				} else if (value.substring(value.length - SUFFIX.length) !== SUFFIX){
					
					// Invalid suffix
					console.log('Invalid suffix: ignoring ' + value)
					continue;
				} else {
					// All ok
					var ipaddr = value.substring(PREFIX.length, value.length - SUFFIX.length)
					// console.log('ipaddr=' + ipaddr + '<')
				}
				
				list.push({ id: machineId, ipaddr: ipaddr });
				
			}
			
			// console.log("WAS " + numChunks + " CHUNKS")
	
			// console.log('IP Addresses: ', list)
			return callback(null, list);
	*/
		});
	}).end();
}

exports.getMachines(function(err, list){
	if (err) {
		console.log(err)
		process.exit(1)
	}
	console.log('All is good: ', list)
});