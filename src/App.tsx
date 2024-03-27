import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ClientRegister from './pages/clients/ClientRegister'
import ClientSearch from './pages/clients/ClientsSearch'
import ClientProfile from './pages/clients/ClientProfile'
import ProductRegister from './pages/products/ProductRegister'
import ProductSearch from './pages/products/ProductSearch'
import ProductExcel from './pages/data/ProductExcel'
import ClientExcel from './pages/data/ClientExcel'
import DataExplore from './pages/data/DataExplore'



import './App.css'
import './css/nav.css'
import './css/colors.css'
import './css/form.css'
import './css/clients.css'
import './css/simpleflex.css'




import{openDatabase} from './database/indexedDBConect'

function App() {
  openDatabase()
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/dataexplore" element={<DataExplore />} />
        <Route path="/clientregister" element={<ClientRegister />} />
        <Route path="/productregister" element={<ProductRegister />} />
        <Route path="/product" element={<ProductSearch />} />
        <Route path="/clients" element={<ClientSearch />} />
        <Route path="/clients/profile/:clientId" element={<ClientProfile />} />
        <Route path="/productExcelUP" element={<ProductExcel />} />
        <Route path="/clientExcelUP" element={<ClientExcel />} />



      </Routes>
      <nav id="NavBar">
        <Link to="/clientregister" className="ToLink">Añadir</Link>
        <Link to="/dataexplore" className="ToLink">Data</Link>
        <Link to="/clients" className="ToLink">Clientes</Link>
        <Link to="/product" className="ToLink">Productos</Link>
      </nav>
    </BrowserRouter>
  )
}

export default App
