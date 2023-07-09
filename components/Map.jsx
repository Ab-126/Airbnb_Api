"use client";

import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCenter } from "geolib";
import { Icon } from "leaflet";

const Maps = ({ searchResults }) => {
  // Transform the search results object into the {latitude: 52.5,longitude:13.75} object

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/5693/5693863.png",
    iconSize: [38, 38],
  });

  const finalCenter = getCenter(coordinates);

  return (
    <MapContainer
      center={[finalCenter.latitude, finalCenter.longitude]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker position={[result.lat, result.long]} icon={customIcon}>
            <Popup>
              <h2>{result.title}</h2>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
};

export default Maps;
