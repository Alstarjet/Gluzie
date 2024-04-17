import React from 'react';
import type { catalog } from '../../interfaces/catalog';

interface ProductFormProps {
  catalog: catalog;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ catalog, onChange }) => {
  return (
    <div className='formRegister'>
      <div>
        Nombre del Catalogo
        <input type="text" name="name" value={catalog.name} onChange={onChange} required />
      </div>
      <div>
        Descripción:
        <input type="text" name="description" value={catalog.description} onChange={onChange} required />
      </div>
    </div>
  );
};

export default ProductForm;
