import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { ToastContainer, toast } from "react-toastify";
import { Vehicle } from "../types/Vehicle";

export type OptionType = {
  label: string;
  value: string;
};

interface FilterProps {
  setFilteredVehicles: (vehicles: Vehicle[]) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ setFilteredVehicles }) => {
  const [selectedRoutes, setSelectedRoutes] = useState<OptionType[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<OptionType[]>([]);

  const loadRoutes = async (
    inputValue: string,
    loadedOptions: OptionType[],
    { page }: any
  ) => {
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
      const res = await fetch(
        `https://api-v3.mbta.com/routes?sort=long_name&page[limit]=${limit}&page[offset]=${offset}&fields[route]=long_name`
      );
      const data = await res.json();

      const options: OptionType[] = data.data.map((route: any) => ({
        label: route.attributes.long_name,
        value: route.id
      }));

      const hasMore = data.data.length === limit;

      return {
        options,
        hasMore,
        additional: { page: page + 1 }
      };
    } catch (error) {
      console.error("Error loading routes:", error);
      return { options: [], hasMore: false, additional: { page: page + 1 } };
    }
  };

  const loadTrips = async (
    inputValue: string,
    loadedOptions: OptionType[],
    { page }: any
  ) => {
    const limit = 20;
    const offset = (page - 1) * limit;

    try {
      const res = await fetch(
        `https://api-v3.mbta.com/vehicles?page[limit]=${limit}&page[offset]=${offset}&fields[vehicle]=trip`
      );
      const data = await res.json();

      const newTrips: OptionType[] = [];
      const seen = new Set(loadedOptions.map(o => o.value));

      data.data.forEach((vehicle: any) => {
        const tripId = vehicle.relationships?.trip?.data?.id;
        if (tripId && !seen.has(tripId)) {
          seen.add(tripId);
          newTrips.push({ label: tripId, value: tripId });
        }
      });

      const hasMore = data.data.length === limit;

      return {
        options: newTrips,
        hasMore,
        additional: { page: page + 1 }
      };
    } catch (error) {
      console.error("Error loading trips:", error);
      return { options: [], hasMore: false, additional: { page: page + 1 } };
    }
  };

  const fetchFilteredVehicles = async () => {
    try {
      const routeParams = selectedRoutes
        .map(r => `filter[route]=${r.value}`)
        .join("&");
      const tripIds = selectedTrips.map(t => t.value);

      let url = `https://api-v3.mbta.com/vehicles?include=trip,route`;
      if (selectedRoutes.length > 0) url += `&${routeParams}`;

      const res = await fetch(url);
      const data = await res.json();

      let vehicles = data.data as Vehicle[];
      if (selectedTrips.length > 0) {
        vehicles = vehicles.filter(vehicle =>
          tripIds.includes(vehicle.relationships?.trip?.data?.id || "")
        );
      }

      setFilteredVehicles(vehicles);
    } catch (error) {
      console.error("Error fetching filtered vehicles:", error);
    }
  };

  useEffect(() => {
    fetchFilteredVehicles();
  }, [selectedRoutes, selectedTrips]);

  const handleResetFilters = () => {
    setSelectedRoutes([]);
    setSelectedTrips([]);
    fetchFilteredVehicles();
    toast.info("Filter telah direset");
  };

  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-medium">Filter Rute:</label>
        <AsyncPaginate
          isMulti
          value={selectedRoutes}
          loadOptions={loadRoutes}
          onChange={setSelectedRoutes}
          additional={{ page: 1 }}
          isSearchable={false}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Filter Trip:</label>
        <AsyncPaginate
          isMulti
          value={selectedTrips}
          loadOptions={loadTrips}
          onChange={setSelectedTrips}
          additional={{ page: 1 }}
          isSearchable={false}
        />
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded mt-2 sm:mt-0"
      >
        Reset Filters
      </button>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default FilterComponent;
