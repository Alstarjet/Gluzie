import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ClientRegister from './pages/clients/ClientRegister'
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
import ClientDashboard from "./pages/clients/ClientDashboard";
import LoginPage from "./pages/data/Login";
import { asyncBack } from './scripts/asyncBack'
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import ProtectedLogin from "./components/utilities/ProtectedLogin";
import RegisterUser from "./pages/data/RegisterUser";
import TermsAndConditions from "./pages/static/TermsAndConditions";
import LandingPage from "./pages/static/landingpage";
import Installpwa from "./pages/static/installpwa";
import CookiePolicy from "./pages/static/CookiePolicy";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import './App.css'
import './css/nav.css'
import './css/colors.css'
import './css/form.css'
import './css/clients.css'
import './css/simpleDisplay.css'
import './css/data.css'




import { openDatabase } from './database/indexedDBConect'
import { useEffect } from "react";
function App() {


  useEffect(() => { asyncBack() }, [])

  openDatabase()
  return (
    <BrowserRouter >
      <header>
        <h1>gluzie.com </h1>
      </header>
      <Installpwa></Installpwa>
      <Routes>
        <Route path="/orders" element={<OrderSearch />} />
        <Route path="/neworder" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
        <Route path="/order/:orderId" element={<ProtectedRoute><EditOrder /></ProtectedRoute>} />
        <Route path="/dataexplore" element={<ProtectedRoute><DataExplore /></ProtectedRoute>} />
        <Route path="/clientregister" element={<ProtectedRoute><ClientRegister /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><ProductMenu /></ProtectedRoute>} />
        <Route path="/productregister" element={<ProtectedRoute><ProductRegister /></ProtectedRoute>} />
        <Route path="/product/search/:catalog" element={<ProtectedRoute><ProductSearch /></ProtectedRoute>} />
        <Route path="/product/:productId" element={<ProtectedRoute><ProductEdit /></ProtectedRoute>} />
        <Route path="/clients" element={<ClientDashboard />} />
        <Route path="/clients/profile/:clientId" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
        <Route path="/clients/newcharge/:clientId" element={<ProtectedRoute><ClientCharge /></ProtectedRoute>} />
        <Route path="/productExcelUP" element={<ProtectedRoute><ProductExcel /></ProtectedRoute>} />
        <Route path="/clientExcelUP" element={<ProtectedRoute><ClientExcel /></ProtectedRoute>} />
        <Route path="/catalogregister" element={<ProtectedRoute><CatalogRegister /></ProtectedRoute>} />
        <Route path="/info" element={<ProtectedRoute><DataInfo /></ProtectedRoute>} />
        <Route path="/clientsDashboard" element={<ClientDashboard />} />
        <Route path="/login" element={<ProtectedLogin><LoginPage /></ProtectedLogin>} />
        <Route path="/register" element={<ProtectedLogin><RegisterUser /></ProtectedLogin>} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/cookiepolicy" element={<CookiePolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <nav id="NavBar">
        <Link to="/dataexplore" className="ToLink" >Menu</Link>
        <Link to="/orders" className="ToLink">Pedidos</Link>
        <Link to="/clients" className="ToLink">Clientes</Link>
        <Link to="/product" className="ToLink" >Productos</Link>
      </nav>
    </BrowserRouter>
  )
}

export default App
