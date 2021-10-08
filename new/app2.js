const fs = require("fs");
const http = require("http");
const PORT = 8080;

const url = require("url");
const mimeTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg"
}

let arr = []

fs.readFile('coffee.csv', { encoding: "utf-8" }, (err, data) => {
    if (err) {
        throw new Error(err);
    }

    console.log(data);

    arr = data.replace(/\r+/g, '').split('\n');
    arr.pop()
    console.log(arr);

});

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("./public/index.html", (err, data) => {
            res.write(!err ? data : "Файл упал", "utf-8");
            arr.forEach((el) => {
                res.write(`<img style="width: 400px; height: 200px;" src=${el} alt="coffee">`);
            })
            res.end();
        });
    }
});

server.listen(PORT, err => !err && console.log('Ваш сервер работает....'));