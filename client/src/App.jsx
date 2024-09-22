import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transaction from "./Pages/Transaction/Transaction";
import Invoice from "./Pages/Invoice/Invoice"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar"
import './App.css';
import './index.css';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="flex">
        <div className="h-[85vh] flex-1">
          <SideBar />
        </div> 
        <div className="w-full h-[85vh] flex-grow basis-3/5 overflow-auto scrollbar-hidden">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<Dashboard />
      },
      {
        path:"/transaction/",
        element:<Transaction />
      },
      {
        path:"/invoice/",
        element:<Invoice />
      }
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;