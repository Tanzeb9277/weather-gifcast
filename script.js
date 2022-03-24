const img = document.querySelector('img');
const temp = document.querySelector('#temp');
const input = document.querySelector('#location');
const search = document.querySelector('#search');
const scale =  document.querySelector('#scale')
const convert = document.querySelector('#convert');
const convertScale = document.querySelector('#convert-scale');
const city = document.querySelector('#city');
let currentMeasurement = 'imperial';
let currentLocation = 'Atlanta';

async function getGif(gif) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=mkR6Xw4tvFCKgBhYJuPQHhZj5Mafgrot&s=${gif}`, {mode: 'cors'});
  const catData = await response.json();
  img.src = catData.data.images.original.url;
}

async function getWeather(location='Atlanta', measurement='imperial') {
    currentMeasurement = measurement;
    currentLocation = location;
    try{
        const response = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=772bfda95d2ceb52b45e3502623a9f03&units=${measurement}`
        , {mode: 'cors'});
        const weatherData = await response.json();
        temp.innerText = Math.round(weatherData.main.temp);
        city.innerHTML =  weatherData.name;
        if(measurement == 'imperial'){
            scale.innerText = 'F'
        }else{
            scale.innerText = 'C'
        }
        getGif(weatherData.weather[0].description)
    }catch(err) {
        alert("Location not found"); // TypeError: failed to fetch
    }

    
  }

search.addEventListener('click', function(){
    let location = input.value;
    getWeather(location)
})
convert.addEventListener('click', function(){
    let location = currentLocation;
    if(currentMeasurement == 'imperial' ){
        getWeather(location, 'metric');
        convertScale.innerText = 'F'
    }else{
        
        getWeather(location, 'imperial');
        convertScale.innerText = 'C'
    }
    
})

getWeather();
