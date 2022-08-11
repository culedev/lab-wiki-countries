import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountriesList = () => {
  const [allCountries, setAllCountries] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    const response = await axios(
      'https://ih-countries-api.herokuapp.com/countries'
    );
    setAllCountries(response.data);
    setIsFetching(false);
  };

  if (isFetching) {
    return <h1>...LOADING</h1>;
  }

  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {allCountries.map((eachCountrie) => {
          return (
            <div key={eachCountrie._id} className="list-group-item list-group-item-action" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountrie.alpha2Code.toLowerCase()}.png`}
                alt={eachCountrie.name.common}
                width={"100px"}
              />
              <Link to={`/${eachCountrie.alpha3Code}`}>{eachCountrie.name.common}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
