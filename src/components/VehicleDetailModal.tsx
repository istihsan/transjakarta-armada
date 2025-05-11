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

  const { label, current_status, latitude, longitude, updated_at, revenue } =
    vehicle.attributes;
  const routeId = vehicle.relationships.route.data?.id;
  const tripId = vehicle.relationships.trip.data?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full relative shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Detail Kendaraan
        </h2>

        <div className="space-y-2">
          <p>
            <strong className="font-bold text-lg text-blue-800">{label}</strong>{" "}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Status:</strong>{" "}
            {current_status === "STOPPED_AT" ? (
              <span className="text-red-500 font-bold">Stopped</span>
            ) : current_status === "IN_TRANSIT_TO" ? (
              <span className="text-green-500 font-bold">In Transit</span>
            ) : current_status === "INCOMING_AT" ? (
              <span className="text-blue-500 font-bold">Incoming</span>
            ) : (
              current_status
            )}
          </p>
          <p>
            <strong className="font-medium text-gray-700">
              Accepting Passengers:
            </strong>{" "}
            {revenue === "REVENUE" ? (
              <span className="text-green-500 font-bold">Yes</span>
            ) : revenue === "NON_REVENUE" ? (
              <span className="text-red-500 font-bold">No</span>
            ) : (
              revenue
            )}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Latitude:</strong>{" "}
            {latitude}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Longitude:</strong>{" "}
            {longitude}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Updated:</strong>{" "}
            {new Date(updated_at).toLocaleString()}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Route:</strong>{" "}
            {routeId}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Trip:</strong>{" "}
            {tripId}
          </p>
        </div>

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
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailModal;
