import City from './City'
import CityItems from './CityItems'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'

import React from 'react'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountriesList() {
  const {cities, isLoading} = useCities()
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) {
      return arr;
    } else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
