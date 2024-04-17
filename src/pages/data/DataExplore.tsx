import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { Link, } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { LuBoxes } from "react-icons/lu";
import ConsutDataOffCloud from '../../backend/postData'

function DataExplore() {
  async function name() {
    let a= await ConsutDataOffCloud()
    console.log(a)
  }
  name()
  return (
    <div className='Databoard'>
      <h2><PiMicrosoftExcelLogoFill />Menu de Datos</h2>
      <Link to="/clientExcelUP"><button className='grandButton buttonBlue'><IoIosPeople />Cargar Clientes</button></Link>
      <Link to="/productExcelUP"><button className='grandButton buttonBlue'><LuBoxes />Cargar Productos</button></Link>
    </div>
  );
}

export default DataExplore;
