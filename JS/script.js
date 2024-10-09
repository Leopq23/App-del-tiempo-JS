const apikey = '0d952cd1b70bd6d31e26292adb3942a0';
const difKelvin = 273.15;
const urlBase = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if(ciudad){
        fetchDatosClima(ciudad);
    }else{
        alert('Por favor ingrese una ciudad');
    }
})


function fetchDatosClima(ciudad){
    const url = `${urlBase}?q=${ciudad}&appid=${apikey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarDiaClima(data))
}

function mostrarDiaClima(data){
    const divClima = document.getElementById('datosClima');
    divClima.innerHTML = '';

    const nombreCiudad = data.name;
    const nombrePais = data.sys.country;
    const temperatura = data.main.temp;
    const humedad = data.main.humidity;
    const descripcion = data.weather[0].description;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${nombreCiudad}, ${nombrePais}`;

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `Temperature: ${Math.floor(temperatura-difKelvin)}°C`;

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `Humidity: ${humedad}%`;

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `Description: ${descripcion}`;

    divClima.appendChild(ciudadTitulo);
    divClima.appendChild(iconoInfo);
    divClima.appendChild(temperaturaInfo);
    divClima.appendChild(humedadInfo);
    divClima.appendChild(descripcionInfo);
}