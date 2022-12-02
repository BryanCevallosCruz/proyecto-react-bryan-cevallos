 
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Navegacion from "./navegacion";

const Layout = () => {
  return (
    <>
      <div className="container py-3">
        <header>
          <Navegacion />
        </header>
        <main>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
