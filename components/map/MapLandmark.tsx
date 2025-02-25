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
import { useStore } from "@/utils/store/storemap";



type LatlngType = [number, number];
type LocationMarkerType = {
  position: LatlngType | null;
  setPosition: (position: LatlngType) => void;
};


const defaultIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});


const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png", 
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

function LocationMarker({ position, setPosition }: LocationMarkerType) {
  const map = useMapEvents({
    click(e) {
      const newLocation: LatlngType = [e.latlng.lat, e.latlng.lng];
      setPosition(newLocation);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon}>
      <Popup>ตำแหน่งที่ต้องการปัก</Popup>
    </Marker>
  );
}

const MapLandmark = ({ location }: { location?: { lat: number; lng: number } }) => {
  const district = useStore((state) => state.district);
  const defaultLocation: LatlngType = district ? district.coords : [16.1865, 103.3007];
  const [position, setPosition] = useState<LatlngType | null>(null);


  return (
    <>
      <h1 className="mt-4 text-2xl font-semibold">Where are you ? </h1>
      {/* <h2 className="text-xl  mb-4 flex items-center">
  <span className="mr-2 ml-4 mt-2 text-blue-50ฟ0">    <MapPinCheck size={40} />
  </span>
  การปักหมุด (จุดที่คุณต้องการปัก)
</h2> */}
      <input type="hidden" name="lat" value={position ? position[0] : ""} />
      <input type="hidden" name="lng" value={position ? position[1] : ""} />
      <MapContainer
        className="h-[50vh] rounded-lg z-0 relative"
        center={location || defaultLocation}
        zoom={9}
        scrollWheelZoom={true}
      >
  
        <Marker position={location || defaultLocation} icon={defaultIcon}>
          <Popup>📍 {district ? district.districtname : "เมืองมหาสารคาม"}</Popup>
        </Marker>
      
        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl>
          <LayersControl.BaseLayer name="แผงผังแผนที่" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="ดาวเทียม">
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
