const coord = {
  lat: null,
  lng: null,
};
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const tempMin = document.querySelector('.temp--min');
const tempMax = document.querySelector('.temp--max');
const tempUnit = document.querySelector('.unit');
const cloudy = document.querySelector('.cloudy');
const windy = document.querySelector('.windy');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const icon = document.querySelector('.icon');
const toggle = document.querySelector('.toggle');
let weather;
let unit = '°C';

function toggleUnit(e) {
  console.log('clock');
  e.stopPropagation();
  const cVal = weather.main.temp;
  const cMin = weather.main.temp_min;
  const cMax = weather.main.temp_max;
  if (unit === '°C') {
    unit = '°F';
    tempUnit.textContent = unit;
    const newVal = Math.round(parseInt(cVal) * 9 / 5 + 32);
    temp.textContent = `${newVal}`;
    const newMax = Math.round(parseInt(cMax) * 9 / 5 + 32);
    const newMin = Math.round(parseInt(cMin) * 9 / 5 + 32);
    tempMax.textContent = `${newMax}`;
    tempMin.textContent = `${newMin}`;
  } else {
    unit = '°C';
    tempUnit.textContent = unit;
    temp.textContent = `${cVal}`;
    tempMax.textContent = `${cMax}`;
    tempMin.textContent = `${cMin}`;
  }
}

function setIcon(data) {
  const i = document.createElement('i');
  const desc = data.toLowerCase();
  switch (desc) {
    case 'drizzle':
      i.classList.add('wi');
      i.classList.add('wi-day-rain');
      icon.appendChild(i);
      break;
    case 'clouds':
      i.classList.add('wi');
      i.classList.add('wi-day-cloudy');
      icon.appendChild(i);
      break;
    case 'rain':
      i.classList.add('wi');
      i.classList.add('wi-day-rain');
      icon.appendChild(i);
      break;
    case 'snow':
      i.classList.add('wi');
      i.classList.add('wi-day-snow');
      icon.appendChild(i);
      break;
    case 'clear':
      i.classList.add('wi');
      i.classList.add('wi-day-sunny');
      icon.appendChild(i);
      break;
    case 'thunderstom':
      i.classList.add('wi');
      i.classList.add('wi-day-thunderstorm');
      icon.appendChild(i);
      break;
    default:
      i.classList.add('wi');
      i.classList.add('wi-day-cloudy');
      icon.appendChild(i);
  }
}

function setContent() {
  city.textContent = `${weather.name.toUpperCase()}, `;
  country.textContent = weather.sys.country.toUpperCase();
  temp.textContent = `${Math.round(weather.main.temp)}`;
  tempMin.textContent = `${weather.main.temp_min}`;
  tempMax.textContent = `${weather.main.temp_max}`;
  description.textContent = weather.weather[0].main;
  setIcon(weather.weather[0].main);
  cloudy.textContent = `${weather.clouds.all}%`;
  windy.textContent = `${weather.wind.speed}mph`;
  humidity.textContent = `${weather.main.humidity}%`;
}

const request = async coordinates => {
  const response = await fetch(
    `https://fcc-weather-api.glitch.me/api/current?lat=${coordinates.lat}&lon=${coordinates.lng}`,
    {
      method: 'get'
    }
  ).catch(err => console.err);
  const data = await response.json();
  weather = data;
  setContent();
};

// Vanilla JS equivalent of document.ready
document.addEventListener(
  'DOMContentLoaded',
  async () =>
    new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        data => {
          [coord.lat, coord.lng] = [data.coords.latitude, data.coords.longitude];
          request(coord);
        },
        err => {
          console.err(err);
        }
      );
    })
);

toggle.addEventListener('click', toggleUnit);
