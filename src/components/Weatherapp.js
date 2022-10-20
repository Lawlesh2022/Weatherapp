import React from 'react'
import { useState, useEffect} from 'react'

const Weatherapp = () => {
    const [search, setSearch] = useState("london")
    const [data, setData] = useState([]);
    const[input, setInput] = useState(" ")
    let componentMounted = true;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9c75260766c39d4793bd68bfdba3fb59`
     
    const fetchWeather = async () =>{
      const response = await fetch(url)
       if(componentMounted){
        setData(await response.json());
        console.log(data);
       }
       return ()=>{
        componentMounted = false;
       }
    }
   
    useEffect(()=>{     
      fetchWeather();
    }, [search])
    const handleSubmit = (event)=>{
       event.preventDefault();
       setSearch(input);
    }
    let d = new Date();
    let date = d.getDate();
    let day = d.toLocaleString("default", {weekday: 'long'});
    let month = d.toLocaleString("default", {month : 'long'});
    let year = d.getFullYear();
    let time = d.toLocaleString([], {
      hour : '2-digit',
      minute : '2-digit',
      second : '2-digit'

    })

    
    let emoji = null;
    if(typeof data.main !="undefined"){
      if(data.weather[0].main ==="Clouds"){
        emoji = "fa-cloud"
      }
      else if(data.weather[0].main ==="Thunderstorm"){
        emoji = "fa-bolt"
      }
      else if(data.weather[0].main ==="Drizzle"){
        emoji = "fa-cloud-rain"
      }
      else if(data.weather[0].main ==="Rain"){
        emoji = "fa-cloud-shower-heavy"
      }
      else if(data.weather[0].main ==="Snow"){
        emoji = "fa-snow-flake"
      }
      else{
        emoji = "fa-smog"
      }
    }
    else{
      return(
        <div>...Loading</div>
      )
    }
    let dir = "";
    let wd = data.wind.deg;
    if(wd===0){
      dir = "East"
    }
    else if(wd>0 && wd<90){
      dir = "North East"
    }
    else if(wd===90){
      dir = "North"
    }
    else if(wd>90 && wd<180){
      dir = "North West"
    }
    else if(wd===180){
      dir = "West"
    }
    else if(wd>180 && wd<270){
      dir = "South West"
    }
    else if(wd===270){
      dir = "South"
    }
    else{
      dir = "South East"
    }
    

  return (   
 
    <>
      <div className="container text-center mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-white text-center border-0">
              <img
                src="https://images.pexels.com/photos/2931915/pexels-photo-2931915.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name = "search"
                      value = {input}
                      onChange = {(e)=>setInput(e.target.value)}
                      required
                    />
                    <button type = "submit" className="input-group-text" id="basic-addon2" onClick = {handleSubmit}>
                     <i className ="fas fa-search"></i>
                    </button>
                  </div>
                
                <div className = "bg-dark bg-opacity-50 py-3">
                <h1 className="card-title">{data.name}</h1>
                <h4 className="card-text">
                  {day}, {month} {date}, {year}
                  <br/>
                  {time}
                </h4>                
                <hr/>
                <i className = {`fas ${emoji} fa-4x`}></i>
                <h1 className = "fw-bolder mb-5"> {data.main.temp}&deg; C</h1>
                <p className = "lead fw-bolder mb-0">{data.weather[0].main}</p>
                <p className = "lead">Max: {data.main.temp_max} &deg; C Min: {data.main.temp} &deg; C</p>
                <p className = "lead">Wind: {dir} {data.wind.speed} mi/hr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weatherapp;
