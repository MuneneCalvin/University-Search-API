import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`http://universities.hipolabs.com/search?country=${country}`)
        .then(response => response.json())
        .then(data => {
          setUniversities(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Error in fetching Universities:', error);
          setLoading(false);
        });
    }
  }, [country]);

  const handleSearch = event => {
    event.preventDefault();
    setCountry(event.target.value);
  };

  const handleClear = () => {
    setCountry('');
    setUniversities([]);
  };

  return (
    <div className='container'>
      <form onClick={handleSearch}>
        <input type="text" value={country} onChange={handleSearch} placeholder='Enter a country' />
        <button type="submit">Search</button>
        <button onClick={handleClear} className='clear'>Clear</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>  
          {universities.map(university => (
            <li key={university.name}>{university.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App