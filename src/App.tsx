import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { LoaderProvider } from "./shared/context/LoaderContext";
import GlobalLoader from "./shared/components/GlobalLoader";

function App() {
  return (
    <LoaderProvider>
      <GlobalLoader />

      <Toaster position="top-right" />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoaderProvider>
  );
}

export default App;