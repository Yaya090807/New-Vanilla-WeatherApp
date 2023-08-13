//Para agarrar el valor del form y buscar datos de la ciudad escrita

function getcity (event){
    //Llamar la ciudad digitada
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    

    //Llamar al API Weather
    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    axios.get(apiurl).then(showdata);

    //Cambiar los datos en el sitio
    function showdata(response){
        //Cambiar el nombre
        let ciudad = response.data.name;
        let pais = response.data.sys.country;
        let nombrecompleto = ciudad + ", " + pais;
        document.querySelector("#city-id").innerHTML = nombrecompleto;

        //Cambiar otros datos segun la ciudad buscada
        document.querySelector("#humiditynum").innerHTML = response.data.main.humidity;
        document.querySelector("#windnum").innerHTML = response.data.wind.speed;
        document.querySelector("#tempnum").innerHTML = Math.round(response.data.main.temp);


    }
    

}

    //Que responda al hacer click el form
    let searchform = document.querySelector("#searcher");
    searchform.addEventListener("submit",getcity);






