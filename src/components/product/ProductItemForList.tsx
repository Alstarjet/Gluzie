import type { productPropsCountDelete } from './interfaceProduct'

function ProductItemForList({ Product, Delete, Count }:productPropsCountDelete) {
  const handleSelectChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const selectedValue = parseFloat(event.target.value);
    Count(Product.key, selectedValue);
  };

  return (
    <tr key={Product.key}>
      <td>{Product.key}</td>
      <td>{Product.name}</td>
      <td>
        <select value={Product.quantity} onChange={handleSelectChange}>
          {/* Crear opciones de 1 a 50 */}
          {Array.from({ length: 50 }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </td>
      <td>${Product.total}</td>
      <td>
        <button onClick={() => Delete(Product.key)}>Eliminar</button>
      </td>
    </tr>
  );
}

export default ProductItemForList;
