const http = require("http");
const PORT = 8080;

const fs = require("fs");
const url = require("url");

const mimeTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg"
}


let arr = fs.readFileSync("mountain.csv", "utf8").split("\n");
console.log(arr)
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile('./public/index.html', { encoding: "utf-8" }, (err, data) => {
            res.write(!err ? data : "Файл упал", "utf-8");
            arr.forEach((el) => {
                res.write(`<img style="width: 400px; height: 200px;" src=${el} alt="aaabv">`);
            })
            res.end();
        });
    } else {
        let fileExt = req.url.split(".");
        console.log(fileExt)
        fileExt = "." + fileExt[fileExt.length - 1];
        console.log(fileExt)

        if (fileExt === ".png" || fileExt === ".jpg") {
            fs.readFile("./public/img" + req.url, (err, data) => {
                // /style.css 
                if (err) console.log(err)
                console.log(data)

                res.write(data, "binary");
                res.end();
            })
        }
    }
});

server.listen(PORT, err => !err && console.log('Ваш сервер работает....'));
