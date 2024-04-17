import { useState, useEffect } from 'react';
import { Link,} from "react-router-dom";
import OrderItem from '../../components/order/OrderItem';
import { ordersDB } from "../../database/ordersDBController";
import { RiAddCircleFill } from "react-icons/ri";

import type { charge } from '../../interfaces/catalog'

function OrderSearch({ }) {
  const [orders, setOrders] = useState<charge[]>([]);
  const [name, setName] = useState<string>('')
  const [ArrayOrdersFilter, setArray] = useState<charge[]>(orders)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArray([])
    const { value } = event.target;
    setName(value);
    orders.forEach(Order => {
      const SinAcentos = Order.clientname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const upperCase = SinAcentos.toUpperCase();
      const letras = value.toUpperCase()
      const regex = new RegExp(letras.split('').join('.*'), 'i');
      if (regex.test(upperCase)) {
        setArray(prevArray => [...prevArray, Order])
      }
    });

  };
  const loadOrders = async () => {
    try {
      let ordersDBs = await ordersDB.readOrders();
      setOrders(ordersDBs);
      setArray(ordersDBs)
    } catch (error) {
      console.error("Error al cargar orderes desde la base de datos: ", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <div>
      <div className='seachAndAdd'>
      <input type="text" id="buscador" value={name} placeholder="Buscar Ordere..." onChange={handleChange} className='searchOrder' />
      <Link to="/neworder" className="ToLink"><RiAddCircleFill className='IcoAdd'/><p>Nuevo</p></Link>
      </div>
      {ArrayOrdersFilter.map(item => (
        <OrderItem DataOrder={item} ></OrderItem>
      ))}
    </div>
  );
}
export default OrderSearch;
