const fs = require("fs");
const http = require("http");

/////////////////////////////////////////////////
// file
////////////////////////////////////////////////

// Blocking syncronous way
// const text = fs.readFileSync("input.txt", "utf-8");
// console.log(text);
// const textOut = `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File writen");

// non-blocking asyncronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error!!");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });
// console.log("Will read file");

////////////////////////////////////////////
// Server //
///////////////////////////////////////////

// creating a server
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening to request on port 8080");
});
