//Para agarrar la lat y long
function getforecast(coordinates){
console.log(coordinates);
let apikey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}`;
console.log(apiurl);
axios.get(apiurl).then(displayforecast);
}

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
        document.querySelector("#infoweather").innerHTML = response.data.weather[0].description;
        
        //Determinar valor para lo que da el API
        celciustemp = response.data.main.temp;
        
        let iconelement = document.querySelector("#iconweather");
        iconelement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);

        //Cambio de fecha actual en ciudad buscada
        document.querySelector("#datecurrent").innerHTML = formatate(response.data.dt * 1000);

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
           
            getforecast(response.data.coord);
    }
        
}


    //Que responda al hacer click el form
    let searchform = document.querySelector("#searcher");
    searchform.addEventListener("submit",getcity);

//Para cambiar las unidades de medidas de la temperatura

    function displaynewfah (event){
        event.preventDefault();
        let fahrenheittemp = (celciustemp * 9) / 5 + 32;
        let newtempnum = document.querySelector("#tempnum");
        newtempnum.innerHTML = Math.round(fahrenheittemp);
        celchange.classList.remove("active");
        fahrenchange.classList.add("active");
    }

    let fahrenchange = document.querySelector("#fah-link");
    fahrenchange.addEventListener("click", displaynewfah);

    

    function displaynewcel (event){
        event.preventDefault();
        let newtempnum2 = document.querySelector("#tempnum");
        newtempnum2.innerHTML = Math.round(celciustemp);
        celchange.classList.add("active");
        fahrenchange.classList.remove("active");
    }

    let celchange = document.querySelector("#cel-link");
    celchange.addEventListener("click", displaynewcel);

    let celciustemp = null;

//Para el forecast

function displayforecast (response){
    console.log(response.data.daily);

    let forecastelement = document.querySelector("#forecast");
    
    let days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let forecasthtml = `<div class="row">`;
    days.forEach(function(day){
        forecasthtml = forecasthtml +  
        `   <div class="col-2">
            <div class="forecast-date">
                ${day} 
            </div> 
            
            <img src="https://openweathermap.org/img/wn/02d.png"
                alt="" 
                width="38"
                >
            <div class="forecast-temp">
                23°C
            </div>
        
            </div>
        `;

    }); 

    forecasthtml = forecasthtml + `</div>`;
    forecastelement.innerHTML = forecasthtml;
}




