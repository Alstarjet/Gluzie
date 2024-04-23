import { useState, useEffect } from 'react';
import { clientsDB } from "../../database/clientsDBController";
import type { client } from '../../interfaces/client'

interface ClientSearchProps{
  Select:(Client:client)=> void
}

function ClientSearch({Select }:ClientSearchProps) {
  const [clients, setClients] = useState<client[]>([]);
  const [name, setName] = useState<string>('')
  const [ArrayClientsFilter, setArray] = useState<client[]>(clients)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArray([])
    const { value } = event.target;
    setName(value);
    clients.forEach(Client => {
      const SinAcentos = Client.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + Client.lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const upperCase = SinAcentos.toUpperCase();
      const letras = value.toUpperCase()
      const regex = new RegExp(letras.split('').join('.*'), 'i');
      if (regex.test(upperCase)) {
        setArray(prevArray => [...prevArray, Client])
      }
    });

  };
  const loadClients = async () => {
    try {
      let clientsDBs = await clientsDB.readClients();
      setClients(clientsDBs);
      setArray(clientsDBs)
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
        <input type="text" id="buscador" value={name} placeholder="Buscar Cliente..." onChange={handleChange} className='searchClient' autoComplete ="off"/>
      </div>
      {(name.length > 1) && <div >{ArrayClientsFilter.map(DataClient => (
        <div key={DataClient.uuid} className='clientItem cardClear'>
          <p className="texthidden">{DataClient.name} {DataClient.lastname}</p>
          <p>{DataClient.neighborhood}</p>
          <p>{DataClient.address}</p>
          <button className='button-5' onClick={() => Select(DataClient)}>Seleccionar</button>
        </div>
      ))}</div>}

    </div>

  );
}
export default ClientSearch;
