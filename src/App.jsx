import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

export default function App() {
  const[CryptoData,setCryptoData]= useState([]);
  const[search,setSearch]=useState('');
  
  useEffect(function() {
    const options = {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/exchanges/binance', 
      headers: {
        'x-rapidapi-host': 'coingecko.p.rapidapi.com',
        'x-rapidapi-key': 'dbeafab3c2mshaba3516e387e86ap1be2b3jsncbb4f9f17b6a',
      },
    };

    axios.request(options).then(function(response) {
      setCryptoData(response.data.coins); 
    }).catch(function(error) {
      console.error(error);
    });

  }, []);

  
  
  function handleSearchInput(event){
    setSearch(event.target.value);
  }
  
  return (
    <main>
      <h2 style={{color: 'green', textAlign:'center'}}>All Cryptocurrencies</h2>
      <input type='text' placeholder='Search' style={{marginLeft:160}} onChange={handleSearchInput}></input>

      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market cap</td>
            <td>Price</td>
            <td>AvailableSupply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        <tbody>
          {CryptoData.filter(function(val){
      if(val.name.toLowerCase().includes(search.toLowerCase())){
        return true;
      }
      else{
        return false;
      }
          }).map(function(val,id){
      return (
        <>
          <tr id={id}>
              <td>{val.rank}</td>
              <td>{val.name}</td>
              <td>{val.symbol}</td>
              <td>₹{val.marketCap}</td>
              <td>₹{val.price.toFixed(2)}</td>
              <td>{val.availableSupply}</td>
              <td>{val.volume.toFixed(0)}</td>
          </tr>
        </>
      )
          })}
        </tbody>
      
      </table>
      
    </main>
  )
}
