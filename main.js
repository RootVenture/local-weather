const coord = {
  lat: null,
  lng: null,
};
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const icon = document.querySelector('.icon');
const toggle = document.querySelector('.toggle');
let weather;
let unit = 'C';

function toggleUnit(e) {
  e.stopPropagation();
  const cVal = weather.main.temp;
  const tempUnit = unit;
  if (tempUnit === 'C') {
    unit = 'F';
    const newVal = Math.round(parseInt(cVal) * 9 / 5 + 32);
    temp.textContent = `${newVal}°${unit}`;
  } else {
    unit = 'C';
    temp.textContent = `${cVal}°${unit}`;
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
  city.textContent = `${weather.name}, `;
  country.textContent = weather.sys.country;
  temp.textContent = `${weather.main.temp}°${unit}`;
  description.textContent = weather.weather[0].main;
  setIcon(weather.weather[0].main);
}

const request = async coordinates => {
  const response = await fetch(
    `https://fcc-weather-api.glitch.me/api/current?lat=${coordinates.lat}&lon=${coordinates.lng}`,
    {
      method: 'get',
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
          console.error(err);
        }
      );
    })
);

toggle.addEventListener('click', toggleUnit);
