// src/modules/property/pages/PropertyList.tsx
import { useEffect, useState } from "react";
import { getProperties } from "../services/PropertyService";
import type { Property } from "../models/Property.interface";
import PropertyCard from "../components/PropertyCard";
import { useLoader } from "../../../shared/context/LoaderContext";
import EmptyState from "../../../shared/components/EmptyState";

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error(err);
        setProperties([]); // en cas d'erreur, on vide la liste pour afficher EmptyState
      } finally {
        hideLoader();
      }
    };

    fetchData();
  }, [showLoader, hideLoader]);

  return (
    <div className="p-8 bg-app-bg min-h-screen">
      <h1 className="text-4xl font-extrabold text-text-primary text-center mb-12">
        Biens publiés
      </h1>

      {properties.length === 0 ? (
        <EmptyState message="Pas de biens disponibles pour le moment" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;