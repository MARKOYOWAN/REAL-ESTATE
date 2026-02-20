import type { Property } from "../models/Property.interface";
import { HiLocationMarker, HiOutlineCash } from "react-icons/hi";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden transition hover:shadow-medium">

      {/* IMAGE */}
      <div className="relative w-full h-48">
        <img
          src="/logo/real_estate.png" // image par défaut
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col justify-between h-40">
        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {property.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Footer - City & Price */}
        <div className="flex justify-between items-center mt-auto">
          {/* City */}
          <div className="flex items-center text-gray-500 text-sm">
            <HiLocationMarker className="mr-1 text-brand-gold" size={18} />
            {property.city}
          </div>

          {/* Price */}
          <div className="flex items-center text-brand-gold font-bold text-sm">
            <HiOutlineCash className="mr-1" size={18} />
            {property.price.toLocaleString()} €
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;