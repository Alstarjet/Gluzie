import { useState } from 'react';
import { catalogsDB } from "../../database/catalogsDBController";
import CatalogForm from '../../components/forms/catalog'
import type { catalog } from '../../interfaces/catalog'
import { v4 as uuidv4 } from 'uuid';




function CatalogRegister() {
  const [catalog, setCatalog] = useState<catalog>({
    key: uuidv4(),
    name: "",
    status: "active"
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name == "name") {
      const regex = /[^a-zA-Z0-9]/g
      const valueClear = value.replace(regex, '')
      setCatalog((prevState) => ({ ...prevState, [name]: valueClear }))
    }
    else {
      setCatalog((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddClient = () => {
    if (catalog.name == ""|| catalog.name.length<3) {
      alert('Nombre Invalido');
        return
    }
    catalogsDB.addCatalog(catalog);
    setCatalog({
      key: uuidv4(),
      name: "",
      status: "active"
    })
    alert("Se Agrego el Catalogo")
    window.history.back();
  }
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='FormView '>
      <button onClick={goBack}>Atras</button>
      <h2>Agregar Catalogo</h2>

      <CatalogForm catalog={catalog} onChange={handleChange} />

      <button onClick={handleAddClient} className='grandButton buttonBlue'>Agregar Catalogo</button>
    </div>
  );
}

export default CatalogRegister;
