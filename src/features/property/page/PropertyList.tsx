import { useEffect, useState } from "react";
import { getProperties } from "../services/PropertyService";
import type { Property } from "../models/Property.interface";
import PropertyCard from "../components/PropertyCard";
import { useLoader } from "../../../shared/context/LoaderContext";

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      showLoader(); // on affiche le loader
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoader(); // on masque le loader
      }
    };

    fetchData();
  }, [showLoader, hideLoader]);

  return (
    <div className="p-8 bg-app-bg min-h-screen">
      <h1 className="text-3xl font-bold text-text-primary mb-6">
        Biens publiés
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;