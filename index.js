const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////////////////////
// file //
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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

// creating a server
const server = http.createServer((req, res) => {
  // routing
  const pathName = req.url;

  // overview page
  if (pathName === "/" || pathName === "overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    console.log(cardsHtml);

    res.end(tempOverview);

    // product page
  } else if (pathName === "/product") {
    res.end("this is the PRODUCT page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening to request on port 8080");
});
