// on any browser, http://localhost:8124/

var http= require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello World from Sophia\n');
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1/8124/');