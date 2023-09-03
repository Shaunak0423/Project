const http = require("http");
var requests = require('requests');
const fs = require("fs");
const { json } = require("body-parser");

const replaceVal = (tempval , origval) => {
    let temperature = tempval.replace("{%tempval%}", origval.main.temp);
    temperature = temperature.replace("{%tempmin%}", origval.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", origval.main.temp_max);
    temperature = temperature.replace("{%location%}", origval.name);
    temperature = temperature.replace("{%country%}", origval.sys.country);
    temperature = temperature.replace("{%tempstatus%}", origval.weather[0].main);
    return temperature;

}

const homeFile = fs.readFileSync("home.html" , "utf-8");

const server = http.createServer((req , res) => {
    if(req.url = "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?lat=15.4034&lon=74.0152&appid=4c82ed6f0397edcf94a9fcfb711c1615', )
.on("data", (chunk) =>  {
    const objdata = JSON.parse(chunk);
    const arrdata = [objdata]
  console.log(arrdata);
  const realTimeData = arrdata.map((val) =>  replaceVal(homeFile , val)).join("");
  console.log(realTimeData);
  
  res.write(realTimeData);
})
.on("end",  (err) =>  {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});

server.listen(4500, "127.0.0.1");