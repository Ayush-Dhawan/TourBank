import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet"
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0])
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
  
  const [mapLat, mapLng] = useUrlPosition()

  function ChangeCentre({position}){
    const map = useMap()
    map.flyTo(position)
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
      click: e => {
        // e.stopPropagation(); // Prevent default navigation
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    });
    return null;
  }
  useEffect(()=>{
    if(mapLat, mapLng)setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(function(){
    if(geolocationPosition) setMapPosition(geolocationPosition)
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      {
        !geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loading..." : "use your position"}
      </Button>
      }
      <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
           <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
           <Popup>
             A pretty CSS3 popup. <br /> Easily customizable.
           </Popup>
         </Marker>
        )) }
        <ChangeCentre position={mapPosition} />
        <DetectClick />
      </MapContainer>
      {/* <h1>
        position: {lat}, {lng}
      </h1>
      <button onClick={()=>setSearchParams({
        lat: 23, lng: 80
      })}>Change pos</button> */}
    </div>
  );
}
