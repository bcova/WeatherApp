import React, {useEffect,useState} from 'react';
import useDebounce from './components/useDebounce';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import './App.css'




function App() {
const [temp, setTemp]= useState([])
const [wind, setWind]= useState([])
const [icon, setIcon]= useState('')
const [text, setText]= useState('')
const [value, setValue] = useState("");
const [place, setPlace] = useState("");
const [ip, setIp] = useState(0);
defineElement(lottie.loadAnimation);

const debouncedSearch = useDebounce(value,2000)
const debouncedLoad = useDebounce(false,2000)
console.log(debouncedLoad)



useEffect(() => {

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '682734a301msh3c9a59f42812124p1b6a65jsn1e803744dd64',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  if(debouncedSearch){ 
    setValue('')
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${debouncedSearch}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {setTemp(response.current.temp_f); setWind(response.current.wind_mph); setIcon(response.current.condition.icon); setText(response.current.condition.text); setPlace(response.location.name);})
      .catch((err) => {
        console.log(err.message);
      });
  }
  
}, [debouncedSearch]);



useEffect(()=> {
  
  async function json(url) {
    const res = await fetch(url);
    return await res.json();
  }
  
  let apiKey = '91bd315d96bff4d95bb911b59f125f0244cf49b23cd0176fa0f82fd1';
  json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    setIp(data.ip);
  });

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '682734a301msh3c9a59f42812124p1b6a65jsn1e803744dd64',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  if(ip !== 0){
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${ip}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((response) => {setTemp(response.current.temp_f); setWind(response.current.wind_mph); setIcon(response.current.condition.icon); setText(response.current.condition.text); setPlace(response.location.name); })
    .catch((err) => {
      console.log(err.message);
    });
  }
      
},[ip])


  return (
    <div className="App">
    <div id='container'>
        <div id='search'>
        <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
        <lord-icon
    src="https://cdn.lordicon.com/msoeawqm.json"
    trigger="loop-on-hover"
    delay="1000"
    colors="primary:#121331,secondary:#08a88a"
    styles="width:250px; height:250px">
</lord-icon>
          <input type="text" placeholder='Enter Search Here'
        value={value}
        onChange={(e)=>{setValue(e.target.value);}}/>
      
        </div>
        
        <div id='conditions'>
        <div id='current'>
          <h4>{place}</h4>
            <div id="icon">
            <img src={ `${icon}`} alt="" />
            </div>
            <div id="text">
            {text}
            </div>
            </div>
          <div id='tw'>
            <div id='temp'>
            {temp} °F
            </div>
            <div id="wind">
            {wind} Mph
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;
