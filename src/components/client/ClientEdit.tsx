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
    clientuuid: DataClient.clientuuid,
    city:DataClient.city,
    neighborhood:DataClient.neighborhood,
    address: DataClient.address,
    phone: DataClient.phone,
    daywork: DataClient.daywork,
    cloud: 0,
    createat:DataClient.createat,
    updateat:new Date()
  });


  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
      setClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddClient = () => {
    if (
      client.name &&

      client.clientuuid &&
      client.address &&
      client.phone &&
      client.daywork
    ) {
      const resultado = window.confirm('¿Los datos del cliente son correctos?');
      if (resultado) {
        clientsDB.updateClientCloud(client);
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
      </div>
    </div>
  );
}

export default ClientEdit;
