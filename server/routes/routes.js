require('dotenv').config();
const axios = require('axios');

const cities = require('./city.list.json');
let redis =require('redis');

const redisPort = process.env.REDIS_URL || 6379;

const client = redis.createClient(redisPort);

const us_cities = cities.filter((item)=> item.country === "US");

function parseQuery(query){
    let isWashington = false;
    let reqStrings = query.split(',').map(str => {return str.trim()});
    if(reqStrings[0] === "Washington" && reqStrings[1] === "DC"){
        reqStrings[0] = reqStrings[0] + ', D.C.';
        isWashington = true;
    }
    let res = us_cities.find(city => city.name === reqStrings[0] && city.state === reqStrings[1]);
    if(isWashington){
        res.state = "";
    }
    return res;
}

function cache(req, res, next){
    const { query } = req.params;
    if(query){
        client.get(query, (err, data) => {
            if(err){
                throw err;
            }

            if(data){
                let parsed = JSON.parse(data);
                res.send(parsed);
            } else {
                next();
            }
        });
    } else {
        res.send({name: 'Error', state: ''});
    }
}

 async function getCurrentWeather(req, res){
    const { query } = req.params;
    let cityData = parseQuery(query);

    if(cityData){ // we found the city in the US    
        const params = new URLSearchParams({
            id: cityData.id,
            units: "imperial",
            appid: process.env.OPEN_WEATHER_API
        });
    
        await axios.get(`${process.env.BASE_URL}${params}`).then(response =>{
            let weatherData = {cityData, forecast: response.data};
            client.setex(query, 3600, JSON.stringify(weatherData));
            res.send(weatherData);
        }).catch((error)=>{
            res.send(error);
        });
    
    } else {
        res.send({name: "Error", state: ""});
    }

}

module.exports = {
    checkCache: cache,
    getWeather: getCurrentWeather
}