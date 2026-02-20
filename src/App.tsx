import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LoaderProvider } from './shared/context/LoaderContext';
import GlobalLoader from './shared/components/GlobalLoader';

function App() {
  return (
    <LoaderProvider>
      {/* Le Toaster doit être en dehors du flux de navigation 
          pour rester visible même lors des changements de page.
      */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          // On s'assure que le toast est au-dessus de tout
          className: 'spinn-toast',
          style: {
            background: '#121212',
            color: '#fff',
            borderRadius: '16px',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            zIndex: 9999, // Priorité maximale
          },
          success: {
            iconTheme: { primary: '#10B981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          }
        }}
      />

      {/* Le Loader est positionné en absolute/fixed dans son propre composant.
          Il doit être à la racine du Provider.
      */}
      <GlobalLoader />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoaderProvider>
  );
}

export default App;