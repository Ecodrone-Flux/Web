import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ onMapClick }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const mapStyles = {
    height: "400px",
    width: "200%",
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    if (onMapClick) {
      onMapClick(lat, lng);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBY0Y6-0YKuzrsaoPmY4SjJAx93J6yeJb8" // Reemplaza con tu clave de API
      loadingElement={<div>Loading...</div>}
      defer
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={{ lat: -17.333551,  lng: -66.226365, }} // Coordenadas por defecto
        onClick={handleMapClick}
      >
        {markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
