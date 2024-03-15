// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useCities } from "../contexts/CitiesContext";
// import 'react-calendar/dist/Calendar.css';


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")
  const [geocodingError, setGeocodingError] = useState("")
  const navigate = useNavigate()
  const {createCity} = useCities()

  const [lat, lng] = useUrlPosition()


  useEffect(function(){
    if(!lat, !lng) return;
    async function fetchCityData(){
     try{
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if(!data.countryCode) throw new Error ("this doesnt seem to be a country or city, click somewhere else")

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
     }catch(err){
        setGeocodingError(err.message)
     }finally{
      setIsLoadingGeocoding(false)
     }
    }
    fetchCityData()
  }, [lat, lng])
  
  if(isLoadingGeocoding) return <Spinner />
  // if(geocodingError) return <Message message={geocodingError} />
  async function handleSubmit(e){
    e.preventDefault();
    
    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
    };
     await  createCity(newCity)
     navigate("/app/cities")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date => setDate(date)} value={date} format="y-MM-dd"/>
        
      </div>

      {/* <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div> */}

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
       <ButtonBack />
      </div>
    </form>
  );
}

export default Form;