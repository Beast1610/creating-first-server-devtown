const http = require('http');
const { listenerCount } = require('process');

const port = 8081; //local port number

const toDolist = ["Complete Node Byte", "Play Cricket"];

http
    .createServer((req,res) => 
    {
        const { method,url } = req;

        if( url === "/todos"){
            if ( method === "GET"){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(toDolist.toString());
            } else if ( method === "POST"){
                let body = "";
                req.on('error',(err) => {
                    console.error(err)                  
                })
                .on('data',(chunk) => {
                    body += chunk;
                })
                .on('end',() => {
                    body=JSON.parse(body);
                    console.log("data :", body);
                });
            }


            else {
                res.writeHead(404);
            }
        }   else {
            res.writeHead(404);
        }
        
        res.end();
        // console.log(method, url); 
        // res.end();
    })
    // .createServer((request, response) => { //also a callback function
    //     response.writeHead(200, {"Content-Type": "text/html"});
    //     response.write("<h1>Hello, this is from my server</h1>");
    //     response.end();
    // })
    .listen(port, () => { // callback function
        console.log(`Nodejs server started on port ${port}`);
    });

// http://localhost:8081 