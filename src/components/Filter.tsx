import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import { Vehicle } from "../types/Vehicle";
import { OptionType } from "../types/Option";

interface FilterComponentProps {
  vehicles: Vehicle[];
  setFilteredVehicles: (filteredVehicles: Vehicle[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  vehicles,
  setFilteredVehicles
}) => {
  const [selectedRoutes, setSelectedRoutes] = useState<OptionType[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<OptionType[]>([]);

  const loadRoutes = async (inputValue: string) => {
    const res = await fetch(
      `https://api-v3.mbta.com/routes?fields%5Broute%5D=long_name`
    );
    const data = await res.json();
    return data.data.map((item: any) => ({
      value: item.id,
      label: item.attributes.long_name
    }));
  };

  const loadTrips = async () => {
    const res = await fetch(
      "https://api-v3.mbta.com/vehicles?fields%5Bvehicle%5D=trip"
    );
    const data = await res.json();

    const tripIds = Array.from(
      new Set(
        data.data
          .map((vehicle: any) => vehicle.relationships.trip?.data?.id)
          .filter((id: string | undefined): id is string => !!id)
      )
    );

    return tripIds.map(id => ({ value: id, label: id }));
  };

  const filterVehicles = () => {
    const filtered = vehicles.filter(vehicle => {
      const routeMatch =
        selectedRoutes.length === 0 ||
        selectedRoutes.some(
          route => vehicle.relationships.route?.data?.id === route.value
        );

      const tripMatch =
        selectedTrips.length === 0 ||
        selectedTrips.some(
          trip => vehicle.relationships.trip?.data?.id === trip.value
        );

      return routeMatch && tripMatch;
    });

    setFilteredVehicles(filtered);
  };

  const handleResetFilters = () => {
    setSelectedRoutes([]);
    setSelectedTrips([]);
    toast.info("Filters have been reset");
    filterVehicles();
  };

  useEffect(() => {
    filterVehicles();
  }, [selectedRoutes, selectedTrips, vehicles]);

  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-medium">Filter Rute:</label>
        <AsyncSelect
          cacheOptions
          isMulti
          loadOptions={loadRoutes}
          onChange={selected => setSelectedRoutes(selected as OptionType[])}
          value={selectedRoutes}
          defaultOptions
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Filter Trip:</label>
        <AsyncSelect
          cacheOptions
          isMulti
          loadOptions={loadTrips}
          onChange={selected => setSelectedTrips(selected as OptionType[])}
          value={selectedTrips}
          defaultOptions
        />
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full sm:col-span-2 bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
      >
        Reset Filters
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default FilterComponent;
