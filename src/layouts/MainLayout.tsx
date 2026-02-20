import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // On applique le fond noir et la police blanche ici
    <div className="min-h-screen bg-spinn-bg text-white flex flex-col relative overflow-hidden">
      
      {/* EFFET VISUEL : Les Blobs en arrière-plan (Style Spinn) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-spinn-accent/10 rounded-full filter blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-spinn-secondary/5 rounded-full filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Header fixe */}
      <HeaderLayout />

      {/* Contenu principal 
          pt-24 ou pt-32 est crucial pour que le contenu commence 
          SOUS le header qui est en 'fixed'.
      */}
      <main className="flex-1 pt-24 md:pt-32 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <FooterLayout />
    </div>
  );
};

export default MainLayout;