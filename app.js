const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
    });

app.post('/', (req, res) => {
    usrInpt = req.body.cityname;
    cityName = usrInpt;
    apiKey = 'cd038be8cc4c519bd47a72b7f92be271'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey+ '&units=metric';
    https.get(url , (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            //Parsing the JSON which we get from API
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            var city = weatherData.name;
            var temp = Math.round(weatherData.main.temp);
            var desc = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write("<h1> The temperature in " + city + " is " + temp + "&#8451 </h1>");
            res.write("<p>The weather is " + desc +" </p>");
            res.write('<img src =' + imageUrl + '>');
            res.send();
        })
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    });