import React from 'react';
import type { client } from '../../interfaces/client';

interface ClientFormProps {
  client: client;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onChange }) => {
  return (
    <div className='formRegister'>
      <div>
        Nombre:
        <input type="text" name="name" value={client.name} onChange={onChange} required />
      </div>
      <div>
        Apellido:
        <input type="text" name="lastname" value={client.lastname} onChange={onChange} required />
      </div>
      <div>
        Edad:
        <input type="number" name="age" value={client.age} onChange={onChange} required />
      </div>
      <div>
        Ciudad:
        <input type="text" name="city" value={client.city} onChange={onChange} required />
      </div>
      <div>
        Colonia:
        <input type="text" name="neighborhood" value={client.neighborhood} onChange={onChange} required />
      </div>
      <div>
        Calle y Número:
        <input type="text" name="address" value={client.address} onChange={onChange} required />
      </div>
      <div>
        Teléfono:
        <input type="tel" name="phone" value={client.phone} onChange={onChange} required />
      </div>
      <div>
        Día de Trabajo:
        <select name="daywork" value={client.daywork} onChange={onChange} required>
          <option value="">-- Seleccione un día --</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
      </div>
    </div>
  );
};

export default ClientForm;
