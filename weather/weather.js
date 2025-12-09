const weatherForm=document.querySelector(".weatherForm");
const card=document.querySelector(".card");
const cityInput=document.querySelector(".cityInput");
const apiKey="adb87b07193112a14d186a201038ae37";
let lat;
let lon;

document.addEventListener("DOMContentLoaded", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                try {
                    
                    const Url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
                    const Response = await fetch(Url);
                    
                    if (!Response.ok) {
                        throw new Error("Could not fetch location data");
                    }
                    
                    const Data = await Response.json();
                    const cityName = Data[0]?.name || 'Unknown City';
                    
                    // Get weather data for the city
                    const weatherData = await getWeatherData(cityName);
                    displayWeather(weatherData);
                    
                } catch (error) {
                    errorDisplay(error.message);
                }
            },
            (error) => {
                errorDisplay(error);
            }
        );
    } else {
        errorDisplay("Geolocation is not supported by this browser");
    }
});


weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    
    const city=cityInput.value;
    if(city){
        try{
            const data= await getWeatherData(city);
            displayWeather(data);
        }
        catch(error){
            errorDisplay(error);
        }
    }
    else{
        errorDisplay("please enter city name");
    }
})

async function getWeatherData(city){
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response= await fetch(url);
    if(!response.ok){
        throw new Error("we could'nt fetch data");
    }
    return await response.json();
   
   
}

function getEmoji(id){
    switch(true){
        case(id>=200 && id<300):
            return "⛈️";
        case(id>=300 && id<400):
            return "🌧️";
        case(id>=500 && id<600):
            return "🌧️";
        case(id>=600 && id<700):
            return "🌨️";
        case(id>=700 && id<800):
            return "🌫️";
        case(id===800):
            return "☀️";
        case(id>800 && id<810):
            return "☁️";
        default:
            return "🙊";
    }

}

function errorDisplay(message){
    const error=document.createElement("p");
    error.textContent=message;
    error.classList.add("error");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(error);

}

function displayWeather(data){
    const {name: city, 
           main:{temp, humidity},
           weather:[{description, id}]
          }=data;

    card.textContent="";
    card.style.display="flex";
    
    const cityDisplay=document.createElement("h1");
    cityDisplay.textContent=city;
    cityDisplay.classList.add("city");
    card.append(cityDisplay);

    const tempDisplay=document.createElement("p");
    tempDisplay.textContent=`Temp: ${(temp-273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("temp");
    card.append(tempDisplay);

    const humidityDisplay=document.createElement("p");
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity");
    card.append(humidityDisplay);

    const descDisplay=document.createElement("p");
    descDisplay.textContent=description;
    descDisplay.classList.add("desc");
    card.append(descDisplay);

    const emojiDisplay=document.createElement("p");
    emojiDisplay.textContent=getEmoji(id);
    emojiDisplay.classList.add("emoji");
    card.append(emojiDisplay);

}



