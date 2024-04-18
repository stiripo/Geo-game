const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

    let oldRes = fs.readFileSync('best_result.js', {
        encoding: 'utf8',
    });
    // console.log(`Old result: ${oldRes}`);

    if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`${oldRes}`);
        res.end();
    } else if (req.method === 'POST') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            // console.log(`New result: ${body}`);
            if (Number(body) > oldRes) {
                console.log(`New result ${body} is greater than old result ${oldRes}`);
                fs.writeFile('best_result.js', body, function (err) {
                    if (err) throw err;
                    console.log('File updated');
                })
                res.end('ok');
            } else {
                console.log(`Old result ${oldRes} is still greater than new ${body}`);
                res.end('ok');
            }
        });
    }
}).listen(8080);
