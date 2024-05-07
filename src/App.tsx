import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ClientRegister from './pages/clients/ClientRegister'
import ClientSearch from './pages/clients/ClientsSearch'
import ClientProfile from './pages/clients/ClientProfile'
import ClientCharge from './pages/clients/ClientCharge'
import ProductMenu from './pages/products/ProductMenu'
import ProductRegister from './pages/products/ProductRegister'
import ProductSearch from './pages/products/ProductSearch'
import ProductEdit from './pages/products/ProductEdit'
import ProductExcel from './pages/data/ProductExcel'
import ClientExcel from './pages/data/ClientExcel'
import DataExplore from './pages/data/DataExplore'
import DataInfo from './pages/data/DataInfo'
import OrderSearch from './pages/orders/OrderSearch'
import NewOrder from './pages/orders/NewOrder'
import EditOrder from './pages/orders/EditOrder'
import CatalogRegister from './pages/products/CatalogRegister'

import asyncBack from './scripts/asyncBack'


import './App.css'
import './css/nav.css'
import './css/colors.css'
import './css/form.css'
import './css/clients.css'
import './css/simpleflex.css'
import './css/data.css'




import { openDatabase } from './database/indexedDBConect'
import { useEffect } from "react";

function App() {

  useEffect(()=>asyncBack,[])

  openDatabase()
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<OrderSearch />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/order/:orderId" element={<EditOrder />} />
        <Route path="/dataexplore" element={<DataExplore />} />
        <Route path="/clientregister" element={<ClientRegister />} />
        <Route path="/product" element={<ProductMenu />} />
        <Route path="/productregister" element={<ProductRegister />} />
        <Route path="/product/search/:catalog" element={<ProductSearch />} />
        <Route path="/product/:productId" element={<ProductEdit />} />
        <Route path="/clients" element={<ClientSearch />} />
        <Route path="/clients/profile/:clientId" element={<ClientProfile />} />
        <Route path="/clients/newcharge/:clientId" element={<ClientCharge />} />
        <Route path="/productExcelUP" element={<ProductExcel />} />
        <Route path="/clientExcelUP" element={<ClientExcel />} />
        <Route path="/catalogregister" element={<CatalogRegister />} />
        <Route path="/info" element={<DataInfo />} />

      </Routes>
      <nav id="NavBar">

        <Link to="/" className="ToLink">Pedidos</Link>
        <Link to="/dataexplore" className="ToLink" >Data</Link>
        <Link to="/clients" className="ToLink">Clientes</Link>
        <Link to="/product" className="ToLink" >Productos</Link>
      </nav>
    </BrowserRouter>
  )
}

export default App
