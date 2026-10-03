const http = require("http");
const fs = require("fs");
http.createServer((request, response) => {
    if(request.url == '/' && request.method == "GET") {
        response.writeHead(200, {"Content-Type": "text/html"});
        return response.end(fs.readFileSync("index.html"));
    }
    if (request.url == "/login" && request.method == "POST") {
        let body = "";
        request.on("data", chunk => body+=chunk);
        request.on("end", () => {
            const { email, password} = JSON.parse(body);
            let error_message = "";
            if (!password || !email) {
                error_message = "Need to enter email and password";
            }
            else if (!email.includes("@")) {
                error_message = "Need to enter valid email";
            }
            else if (password.length < 8) {
                error_message = "Need to have at least 8 character password length";
            }
            else{
                error_message = "login successful";
            }
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify({error_message}));
        });
        return;
    }
}).listen(3000);
console.log("Open http://localhost:3000");