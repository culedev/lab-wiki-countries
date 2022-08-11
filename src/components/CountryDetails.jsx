import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountryDetails = () => {
    const {country} = useParams()
    const [countryDetails, setCountryDetails] = useState()
    const [isFetching, setIsFetching] = useState(true)
    console.log(country)


    useEffect(() => {
        getCountryDetails()
    }, [country])

    const getCountryDetails = async () => {
        const response = await axios(`https://ih-countries-api.herokuapp.com/countries/${country}`)
        setCountryDetails(response.data)
        console.log(response.data)
        setIsFetching(false)
    }


    if(isFetching){
        return <h1>...LOADING</h1>
    }
  return (
    <div className="col-7">
      <h1>{countryDetails.name.common}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{width: "30%"}}>Capital</td>
            <td>{countryDetails.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {countryDetails.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
              {countryDetails.borders.map(eachBorder => {
               return   <li style={{listStyle: "none"}}>              
                            <Link to={`/${eachBorder}`}>{eachBorder}</Link>
                        </li>
              })}
                
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountryDetails;
