import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { Link, } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { LuBoxes } from "react-icons/lu";
import { RiLoginBoxFill } from "react-icons/ri";


function DataExplore() {

  return (
    <div className='Databoard'>
      <h2><PiMicrosoftExcelLogoFill />Menu de Datos</h2>
      <Link to="/clientExcelUP"><button className='grandButton buttonBlue'><IoIosPeople />Cargar Clientes</button></Link>
      <Link to="/productExcelUP"><button className='grandButton buttonBlue'><LuBoxes />Cargar Productos</button></Link>
      <Link to="/info"><button className='grandButton buttonBlue'><RiLoginBoxFill />Iniciar Sesión</button></Link>
    </div>
  );
}

export default DataExplore;
