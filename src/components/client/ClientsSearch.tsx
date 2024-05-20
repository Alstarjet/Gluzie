import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";
import ClientItem from './ClientItem';
import { clientsDB } from "../../database/clientsDBController";
import { RiAddCircleFill } from "react-icons/ri";
import './ClientsSearch.css'
import type { client } from '../../interfaces/client'

function ClientsSearch({ }) {
  const [clients, setClients] = useState<client[]>([]);
  const [name, setName] = useState<string>('')
  const [ArrayClientsFilter, setArray] = useState<client[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArray([])
    const { value } = event.target;
    setName(value);
    if (value.length>2){
      clients.forEach(Client => {
        const name: string = Client.name + " " + Client.lastname
        const SinAcentos = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const upperCase = SinAcentos.toUpperCase();
        const letras1 = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const letras = letras1.toUpperCase()
        const regex = new RegExp(letras.split('').join('.*'), 'i');
        if (regex.test(upperCase)) {
          setArray(prevArray => [...prevArray, Client])
        }
      });
    }else{
      setArray([])
    }
    

  };

  const loadClients = async () => {
    try {
      let clientsDBs = await clientsDB.readClients();
      setClients(clientsDBs);
    } catch (error) {
      console.error("Error al cargar clientes desde la base de datos: ", error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);
  return (
    <div>
      <div className='seachAndAdd'>
        <input type="text" id="buscador" value={name} placeholder="Buscar Cliente..." onChange={handleChange} className='searchClient' autoComplete="off"/>
        <Link to="/clientregister" className="ToLink"><RiAddCircleFill className='IcoAdd' /><p>Nuevo</p></Link>
      </div>
      <div className='boxClientSearch'>
      {ArrayClientsFilter.map(item => (
        <ClientItem DataClient={item} ></ClientItem>
      ))}
      </div>

    </div>
  );
}
export default ClientsSearch;
