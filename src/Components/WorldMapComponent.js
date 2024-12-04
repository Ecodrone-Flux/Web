import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsContext';

const WorldMapComponent = () => {
  const initialCenter = { lat: 20, lng: 0 }; // Coordenadas iniciales
  const initialZoom = 2; // Nivel de zoom inicial

  const [zoom, setZoom] = useState(initialZoom); // Estado para manejar el nivel de zoom
  const [center, setCenter] = useState(initialCenter); // Estado para manejar el centro del mapa
  const [alerts, setAlerts] = useState([]); // Estado para manejar las alertas

  const mapRef = useRef(); // Ref para almacenar la instancia del mapa

  // Usamos el hook del contexto para verificar si la API de Google Maps se ha cargado
  const { isLoaded } = useGoogleMaps();

  // Obtener las alertas desde el servidor
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/alerts`);
        const data = await response.json();
        setAlerts(data); // Almacena las alertas en el estado
        console.log(data);
      } catch (err) {
        console.error("Error al obtener las alertas:", err);
      }
    };

    fetchAlerts();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const handleMarkerClick = (coords) => {
    setCenter(coords); // Cambia el centro del mapa al marcador clickeado
    setZoom(15); // Aumenta el zoom cuando se hace clic en un marcador
    if (mapRef.current) {
      mapRef.current.setZoom(15); // Ajusta también el zoom del mapa
    }
  };

  const resetView = () => {
    setCenter(initialCenter); // Restaura el centro inicial
    setZoom(initialZoom); // Restaura el zoom inicial
    if (mapRef.current) {
      mapRef.current.setZoom(initialZoom); // Ajusta el zoom inicial
    }
  };

  const enforceZoomLimits = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom < initialZoom) {
        mapRef.current.setZoom(initialZoom); // Corrige el zoom si está por debajo del nivel inicial
      } else {
        setZoom(currentZoom); // Actualiza el estado del zoom si es válido
      }
    }
  };

  if (!isLoaded) return <div>Loading map...</div>; // Muestra un mensaje mientras la API no esté cargada

  return (
    <div>
      <button onClick={resetView} style={{ marginBottom: '10px' }}>
        Volver a la vista inicial
      </button>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '400px' }}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          mapRef.current = map; // Guardamos la referencia al mapa
          map.addListener('zoom_changed', enforceZoomLimits); // Añadimos el listener para controlar el zoom
        }}
        options={{
          minZoom: initialZoom, // Nivel mínimo de zoom directamente en las opciones del mapa
          mapTypeId: 'hybrid',
        }}
      >
        {alerts.map((alert) => (
          <Marker
            key={alert.id} // Asegúrate de que la clave del marcador sea única
            position={{ lat: alert.latitude, lng: alert.longitude }}
            title={`Alert: ${alert.alerttype}`} // Puedes cambiar el título al detalle de la alerta
            onClick={() => handleMarkerClick({ lat: alert.latitude, lng: alert.longitude })} // Llama a la función handleMarkerClick cuando se hace clic
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default WorldMapComponent;