"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { IPosition } from "../LocationPicker";

interface MapProps {
  position: IPosition;
}

const Map = (Map: MapProps) => {
  const { position } = Map;

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
      <Marker position={position} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
