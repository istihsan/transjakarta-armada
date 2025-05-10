import React, { useEffect, useState } from "react";
import { Vehicle } from "./types/Vehicle.ts";
import VehicleCard from "./components/VehicleCard.tsx";
import VehicleDetailModal from "./components/VehicleDetailModal.tsx";
import FilterComponent from "./components/Filter.tsx";
import Pagination from "./components/Pagination.tsx";

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [paginatedVehicles, setPaginatedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api-v3.mbta.com/vehicles");
        const data = await res.json();
        setVehicles(data.data);
        setFilteredVehicles(data.data);
        setError("");
      } catch (err) {
        setError("Gagal mengambil data kendaraan");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Transjakarta Armada Management
      </h1>

      <FilterComponent
        vehicles={vehicles}
        setFilteredVehicles={setFilteredVehicles}
      />

      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedVehicles.map(v => (
          <VehicleCard key={v.id} vehicle={v} onClick={setSelectedVehicle} />
        ))}
      </div>

      <Pagination
        totalItems={filteredVehicles.length}
        onPageDataChange={(start, end) => {
          setPaginatedVehicles(filteredVehicles.slice(start, end));
        }}
      />

      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
};

export default App;
