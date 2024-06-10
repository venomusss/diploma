"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Box } from "@mui/material";

export interface IPosition {
  lat: number;
  lng: number;
}

export interface ILocationPicker {
  position: IPosition;
  setPosition: (pos: IPosition) => void;
}

function MyComponent({
  setPosition,
}: {
  setPosition: (pos: IPosition) => void;
}) {
  const map = useMapEvents({
    click: (location) => {
      map.locate();
      setPosition({ lat: location.latlng.lat, lng: location.latlng.lng });
    },
  });
  return null;
}

const LocationPicker = ({ position, setPosition }: ILocationPicker) => {
  return (
    <MapContainer
      center={position}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent setPosition={setPosition} />
      <Marker position={position} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPicker;
