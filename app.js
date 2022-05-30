const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("Server is up and running.");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "383e7713b19e13d1a06c569fb81c2d60";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=+" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // const object  = {
      //     name: 'Mukund',
      //     favouriteFood: 'Pizza'
      // }
      // const a = JSON.stringify(object);
      // console.log(a);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(weatherDescription);
      console.log(temp);
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " +
          req.body.cityName +
          " is " +
          temp +
          " degrees celsius.</h1>"
      );
      res.write("<img src=" + imageURL + " />");
      res.send(); //we can only have 1 res.send() but we can have multiple res.write();
    });
  });
  // console.log("Post request received.");
});

app.listen(3000, function () {
  console.log("Server is running at port 3000.");
});
