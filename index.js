var Connection = require('ssh2');



function getDetails(){
	
	console.log('o')
	
	/*
	 *	Open the SSH connection, and an SFTP connection within it.
	 */
	var conn = new Connection();
	conn.on('ready', function() {
		Log.debug('Connection :: ready');
		// Run chown, to set the user and group to 'tooltwist'
		var cmd = 'ls -l';
		conn.exec(cmd, function(err, stream) {
			if (err) throw err;
			stream.on('exit', function(code, signal) {
				Log.debug('Stream :: exit :: code: ' + code + ', signal: ' + signal);
				conn.end(code);
				process.exit(0)
			}).on('close', function() {
				Log.debug('Stream :: close');
			}).on('data', function(data) {
				Log.debug('STDOUT: ' + data);
			}).stderr.on('data', function(data) {
				Log.debug('STDERR: ' + data);
			});
		});
	}); // conn ready
	conn.on('error', function(err){
		Log.debug('Error: ', err)
		finalCallback(err);
	});
	conn.on('close', function(){
		Log.debug('connection closed')
	});
	
	var host = '128.199.176.242';
	var sshPort = 22;
	var username = 'core';
	conn.connect({
		host: host,
		port: sshPort,
		username: username,
		privateKey: require('fs').readFileSync('/Users/philipcallender/.ssh/id_rsa')//ZZZZZ
	});
	
}





// Main
getDetails();