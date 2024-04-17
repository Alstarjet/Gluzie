import React, { useState,useEffect } from 'react';
import type { productInventoryItem } from '../../interfaces/catalog';
import { catalogsDB } from "../../database/catalogsDBController";
import type { catalog } from '../../interfaces/catalog';

interface ProductFormProps {
  product: productInventoryItem;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onChange }) => {
  const [catalog, setCatalog]=useState<catalog[]>()
  useEffect(() => {
    const fetchClient = async () => {
        
            try {
                const clientDB = await catalogsDB.readCatalogs();
                setCatalog(clientDB);
            } catch (error) {
                console.error("Error fetching ctalogs:", error);
            }
        
    }
    fetchClient();
}, []);

  return (
    <div className='formRegister'>
      <div>
        Nombre del Producto:
        <input type="text" name="name" value={product.name} onChange={onChange} required />
      </div>
      <div>
        ClaveUnica:
        <input type="text" name="key" value={product.key} onChange={onChange} required />
      </div>
      <div>
        Precio:
        <input type="number" name="price" value={product.price} onChange={onChange} required />
      </div>
      <div>
        Pagina o Referencia:
        <input type="text" name="page" value={product.page} onChange={onChange} required />
      </div>
      <div>
        Existencia:
        <input type="number" name="stock" value={product.stock} onChange={onChange} required />
      </div>
      <div>
        Unidad de Medida:
        <select name="type" value={product.type} onChange={onChange} required>
          <option value="Piezas">Piezas</option>
          <option value="Metros">Metros</option>
          <option value="Kilos">Kilos</option>
          <option value="Litros">Litros</option>
        </select>
      </div>
      <div>
        Catalogo:
        <select name="catalog" value={product.catalog} onChange={onChange} required>
          <option value="Default">Default</option>
          {catalog && catalog.map(item => (
    <option value={item.name} key={item.key}>{item.name}</option>
))}
        </select>
      </div>
    </div>
  );
};

export default ProductForm;
