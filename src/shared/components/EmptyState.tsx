// src/modules/property/components/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20">
      <img
        src="/logo/real_estate.png"
        alt="No data"
        className="w-32 h-32 mb-6 opacity-50"
      />
      <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
        {message || "Aucune donnée disponible"}
      </h2>
      <p className="text-gray-500 text-center max-w-xs">
        Veuillez vérifier votre connexion internet ou réessayer plus tard.
      </p>
    </div>
  );
};

export default EmptyState;