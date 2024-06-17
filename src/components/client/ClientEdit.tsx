import { useState } from 'react';
import { clientsDB } from "../../database/clientsDBController";
import ClientForm from '../forms/clients'
import type { client } from '../../interfaces/client'

interface ClientItemProps {
  DataClient: client; // Corrección del nombre de la propiedad y del tipo
  Reload: () => void,

}

function ClientEdit({ DataClient, Reload }:ClientItemProps) {
  const [client, setClient] = useState<client>({
    name: DataClient.name,
    lastname:DataClient.lastname,
    age:DataClient.age,
    uuid: DataClient.uuid,
    city:DataClient.city,
    neighborhood:DataClient.neighborhood,
    address: DataClient.address,
    phone: DataClient.phone,
    daywork: DataClient.daywork,
    cloud: 0,
    createat:DataClient.createat,
    updateat:new Date(),
    status:"active"
  });


  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
      setClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddClient = () => {
    if (
      client.name &&

      client.uuid &&
      client.address &&
      client.phone &&
      client.daywork
    ) {
      const resultado = window.confirm('¿Los datos del cliente son correctos?');
      if (resultado) {
        clientsDB.editClient(client);
        Reload()
      } 
    }else {
      alert("Faltan Datos")
    }
  }

  return (
    <div className='pageSelect'>
      <div className='FormView'>
      <ClientForm client={client} onChange={handleChange} />
        <button onClick={handleAddClient} className='grandButton buttonBlue'>Guardar Cambios</button>
        <pre>{JSON.stringify(client, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ClientEdit;
