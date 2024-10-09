const difKelvin = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if(ciudad){
        fetchDatosClima(ciudad);
    }else{
        alert('Por favor ingrese una ciudad');
    }
})


function fetchDatosClima(ciudad){
    const urlBackend = `http://localhost:3000/clima/${ciudad}`;
    fetch(urlBackend)
        .then(response => response.json())
        .then(data => mostrarDiaClima(data))
        .catch(error => console.error('Error al obtener los datos del clima:', error));
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