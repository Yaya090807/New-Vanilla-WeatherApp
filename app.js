//Para agarrar el valor del form y buscar datos de la ciudad escrita

function getcity (event){
    //Llamar la ciudad digitada
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    

    //Llamar al API Weather
    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
console.log(apiurl);

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
        document.querySelector("#infoweather").innerHTML = response.data.weather[0].description;

        //Cambio de fecha actual en ciudad buscada
        document.querySelector("#datecurrent").innerHTML = formatate(response.data.dt * 1000.005);

            //Funcion para cambiar el formato de la fecha
            function formatate (timestamp){
                let date = new Date(timestamp);
                //Horas
                let hours = date.getHours();
                if(hours<10){
                    hours = `0${hours}`;
                }
            
                let letra = "m.d.";
                if (hours <12){
                    letra ="a.m.";
                } else
                        if (hours>12){
                    letra = "p.m.";
                }

                //Minutos
                let minutes = date.getMinutes();
                if(minutes<10){
                    minutes = `0${minutes}`;
                }

                //Fecha
                let fecha = date.getDate();

                //Dias
                let days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let day = days[date.getDay()];

                //Mes
                let months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ];
                let month = months[date.getMonth()];
                  
                return `${day} ${fecha} ${month}, ${hours}:${minutes} ${letra}`;
            }
            
    }
    

}

    //Que responda al hacer click el form
    let searchform = document.querySelector("#searcher");
    searchform.addEventListener("submit",getcity);






