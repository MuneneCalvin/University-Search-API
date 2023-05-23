import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`https://universitiesapi.onrender.com/v1/api/universities/${country}`)
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
    loading(true);
  };

  const handleClear = () => {
    setCountry('');
    setUniversities([]);
  };

  return (
    <div className='container'>
      <h2>Discover Universities in the world</h2>
      <form onClick={handleSearch}>
        <input type="text" value={country} onChange={handleSearch} placeholder='Enter a country' />
        <button type="submit">Search</button>
        <button onClick={handleClear} className='clear'>Clear</button>
      </form>

      { loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div className='box'>
          {universities.length > 0 ? (
            <ul>
              {universities.map((university, index) => (
                <li key={index}>
                  <strong>Name:</strong> {university.name} <br />
                  <strong>Country:</strong> {university.country} <br />
                  {/* <strong>Country code:</strong> {university.alpha_two_code} <br /> */}
                  <strong>Website:</strong> <a href={university.web_pages[0]}>{university.web_pages[0]}</a>
                </li>
              ))}
            </ul>
          ) : (
            <div className='no-result'>No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App