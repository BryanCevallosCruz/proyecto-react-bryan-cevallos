import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";


import Layout from "./componentes/layout";

import routesPrivate from "./routes/rutas";
import Informacion from "./pages/informacion";

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Layout />}>
          <Route index element={<Informacion />}></Route>
          {routesPrivate.map((route) => (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          ))} 
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;