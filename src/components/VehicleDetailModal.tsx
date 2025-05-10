import React from "react";
import { Vehicle } from "../types/Vehicle";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

interface Props {
  vehicle: Vehicle | null;
  onClose: () => void;
}

const VehicleDetailModal: React.FC<Props> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const { label, current_status, latitude, longitude, updated_at } =
    vehicle.attributes;
  const routeId = vehicle.relationships.route.data?.id;
  const tripId = vehicle.relationships.trip.data?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4">Detail Kendaraan</h2>

        <p>
          <strong>Label:</strong> {label}
        </p>
        <p>
          <strong>Status:</strong> {current_status}
        </p>
        <p>
          <strong>Latitude:</strong> {latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {longitude}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(updated_at).toLocaleString()}
        </p>
        <p>
          <strong>Route:</strong> {routeId}
        </p>
        <p>
          <strong>Trip:</strong> {tripId}
        </p>

        <div className="mt-4 h-64 w-full">
          <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>
                {label} – {current_status}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailModal;
