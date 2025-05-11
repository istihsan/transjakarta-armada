import React, { useEffect, useState } from "react";
import { Vehicle } from "./types/Vehicle.ts";
import VehicleCard from "./components/VehicleCard.tsx";
import VehicleDetailModal from "./components/VehicleDetailModal.tsx";
import FilterComponent from "./components/Filter.tsx";
import Pagination from "./components/Pagination.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import ErrorMessage from "./components/ErrorMessage.tsx";

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
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      <FilterComponent setFilteredVehicles={setFilteredVehicles} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
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
