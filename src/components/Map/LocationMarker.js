import { useEffect, useState } from "react"
import { DollarSign } from "react-feather"
import { Marker, Popup, useMapEvents } from "react-leaflet"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { Icon } from "leaflet";


export default function LocationMarker({onLocationFound}) {
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        onLocationFound(e.latlng)
      },
    })

    
    useEffect(() => {
        if(map){
            map.locate()
        }
    },[map])
    
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    return position === null ? null : (
      <Marker icon={DefaultIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }