import React from 'react'

const weather = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '682734a301msh3c9a59f42812124p1b6a65jsn1e803744dd64',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=elmwood%20park', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export default weather