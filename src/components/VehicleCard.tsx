import React from "react";

interface Props {
  vehicle: any;
  onClick: (vehicle: any) => void;
}

const VehicleCard: React.FC<Props> = ({ vehicle, onClick }) => {
  return (
    <div
      className="p-4 border rounded shadow hover:bg-indigo-100 cursor-pointer"
      onClick={() => onClick(vehicle)}
    >
      <h2 className="font-bold text-lg text-blue-800">
        {vehicle.attributes?.label ?? "No Label"}
      </h2>
      <p>
        <strong>Status:</strong>{" "}
        {vehicle.attributes?.current_status === "STOPPED_AT" ? (
          <span className="text-red-500 font-bold">Stopped</span>
        ) : vehicle.attributes?.current_status === "IN_TRANSIT_TO" ? (
          <span className="text-green-500 font-bold">In Transit</span>
        ) : vehicle.attributes?.current_status === "INCOMING_AT" ? (
          <span className="text-blue-500 font-bold">Incoming</span>
        ) : (
          vehicle.attributes?.current_status
        )}
      </p>
      <p>Latitude: {vehicle.attributes?.latitude ?? "-"}</p>
      <p>Longitude: {vehicle.attributes?.longitude ?? "-"}</p>
      <p>
        Updated At: {new Date(vehicle.attributes?.updated_at).toLocaleString()}
      </p>
    </div>
  );
};

export default VehicleCard;
