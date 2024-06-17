import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { Link, } from "react-router-dom";
import { LuBoxes } from "react-icons/lu";
import { IoSyncCircle } from "react-icons/io5";
import { getData } from '../../backend/getData'
import { useNavigate } from 'react-router-dom';
import CryptoStorage from "../../localstorage/mangerstorage";
import { useEffect, useState } from "react";
import LogOff from "../../backend/logOff";
import { InitBackDirect } from "../../scripts/asyncBack";
import getNewJWT from "../../backend/getJWT";
import createExcelAllData from "../../scripts/createExcelBackup";
function DataExplore() {
  const navigate = useNavigate();
  const [typeC, setTypeC] = useState<string>("");
  const [nameClient,setNameClient]=useState<string|null>()
  useEffect(() => {
    const clientT = CryptoStorage.consultTypeclient();
    const clientN=localStorage.getItem('UserName')
    setTypeC(clientT);
    setNameClient(clientN)
  }, []);

  useEffect(() => {
    console.log('Updated typeC:', typeC); // Verifica cuando typeC cambia
  }, [typeC]);

  async function GetData() {
    const status = await getData();
    if (status >= 400 && status <= 499) {
      navigate('/login');
    }
  }
  async function LogOffs() {
    let status = await getNewJWT()
    if (status > 300) {
      alert("Problemas al Cerrar Sesión, posibles datos faltantes de respaldar, intentalo mas tarde")
      navigate('/login');
    }
    status = await InitBackDirect()
    if (status >= 200 && status <= 299) {
      status = await LogOff();
      if (status >= 200 && status <= 299) {
        localStorage.setItem('Token', '')
        navigate('/login');
      } else if (status >= 400 && status <= 499) {
        localStorage.setItem('Token', '')
        navigate('/login');
      } else {
        alert("Error al Cerrar Sesión, pero todos los datos han sido respaldados")
      }
    } else {
      alert("Problemas al Cerrar Sesión, posibles datos faltantes de respaldar, intentalo mas tarde")
    }

  }
  async function CreateExcel() {
    await createExcelAllData()
  }
  return (
    <div className='Databoard'>
      <h2> Hola {nameClient}</h2>
      <button onClick={LogOffs} className='grandButton buttonBlue'><IoSyncCircle /> Cerrar Sesión</button>
      <Link to="/productExcelUP"><button className='grandButton buttonBlue'><LuBoxes /> Cargar Productos desde Excel</button></Link>
      <button onClick={CreateExcel} className='grandButton buttonBlue'><PiMicrosoftExcelLogoFill /> Descargar Respaldo en Excel </button>
      {(typeC == 'Amethyst') && (
        <button onClick={GetData} className='grandButton buttonBlue'><IoSyncCircle /> Sincronizar Datos</button>
      )}
    </div>
  );
}

export default DataExplore;
//version 1.0