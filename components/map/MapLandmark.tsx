"use client";
import React, { useState } from "react";
import {
    LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


type LatlngType = [number,number]
type LocationMarkerType = {
    position : LatlngType | null;
    setPosition : (position : LatlngType) =>void
}

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

function LocationMarker({ position, setPosition } : LocationMarkerType) {
  const map = useMapEvents({
    click(e) {
        const newLocation : LatlngType = [e.latlng.lat,e.latlng.lng]
      setPosition(newLocation);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapLandmark = ({
  location,
}: {
  location?: { lat: number; lng: number };
}) => {
    const defaultLocation : LatlngType = [16.1865, 103.3007]
  const [position, setPosition] = useState<LatlngType | null>(null);
  console.log(position);

  return (
    <>
      <h1 className="mt-4 font-semibold">Where are you ?</h1>
      <input type="hidden" name="lat" value={position ? position[0] : ''} />
      <input type="hidden" name="lng" value={position ? position[1] : ''} />
      <MapContainer
        className="h-[50vh] rounded-lg z-0 relative"
        center={location || defaultLocation}
        zoom={9}
        scrollWheelZoom={true}
      >
  
        <Marker position={location || defaultLocation} icon={customIcon}>
          <Popup>📍 มหาสารคาม - ใจกลางเมือง</Popup>
        </Marker>
        <LocationMarker position={position} setPosition={setPosition} />



        <LayersControl>
            <LayersControl.BaseLayer name="แผงผังแผนที่" checked>
            <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="ดาวเทียม" >
            <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
            </LayersControl.BaseLayer>
        </LayersControl>


      </MapContainer>
    </>
  );
};

export default MapLandmark;
