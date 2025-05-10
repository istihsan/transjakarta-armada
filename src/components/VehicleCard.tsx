import React from "react";

interface Props {
  vehicle: any;
  onClick: (vehicle: any) => void;
}

const VehicleCard: React.FC<Props> = ({ vehicle, onClick }) => {
  return (
    <div
      className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(vehicle)}
    >
      <h2 className="font-bold text-lg">
        {vehicle.attributes?.label ?? "No Label"}
      </h2>
      <p>Status: {vehicle.attributes?.current_status ?? "Unknown"}</p>
      <p>Latitude: {vehicle.attributes?.latitude ?? "-"}</p>
      <p>Longitude: {vehicle.attributes?.longitude ?? "-"}</p>
      <p>
        Updated At: {new Date(vehicle.attributes?.updated_at).toLocaleString()}
      </p>
    </div>
  );
};

export default VehicleCard;
