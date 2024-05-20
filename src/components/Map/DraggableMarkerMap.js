import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DraggableMarker from './DraggableMarker'
import LocationMarker from './LocationMarker'

function DraggableMarkerMap() {
    const [currentLocation, setCurrentLocation] = useState()
    const center = {
        lat: 51.505,
        lng: -0.09,
      }

      const onLocationFound = (latlng) => {
        setCurrentLocation(latlng)
      }
      
  return (
        <MapContainer 
        style={{ width: "100%", height: "calc(100vh - 4rem)" }}
        center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLocation && 
            <DraggableMarker currentLocation={currentLocation}/>
            }
          <LocationMarker onLocationFound={onLocationFound}/>
        </MapContainer>
  )
}

export default DraggableMarkerMap