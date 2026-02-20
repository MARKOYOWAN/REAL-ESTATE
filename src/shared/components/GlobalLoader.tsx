// src/shared/components/GlobalLoader.tsx
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300">
            {/* Logo animé */}
            <img
                src="/logo/logo.png"
                alt="Logo"
                className="w-24 h-24 mb-6 animate-bounce-slow"
            />

            {/* Spinner stylé */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-brand-gold border-l-transparent rounded-full animate-spin" />
            </div>

            {/* Texte animé */}
            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-black animate-pulse">
                Chargement en cours...
            </p>
        </div>
    );
};

export default GlobalLoader;