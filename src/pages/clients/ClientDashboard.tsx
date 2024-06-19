import { useState, useEffect } from 'react';
import { clientsDB } from "../../database/clientsDBController";
import ClientsForDay from '../../components/client/ClientsForDay';
import type { client } from '../../interfaces/client'
import ClientsSearch from '../../components/client/ClientsSearch'
import './ClientDashboard.css'
import FeedAdSense from '../../adsense/feed';
function ClientDashboard() {
  const [clientsfDay, setClientsfDay] = useState<client[][]>([]);
  const [selectedDay, setSelectedDay] = useState(0); // Estado para el día seleccionado, comenzando con 0 (domingo)
  const [animateKey, setAnimateKey] = useState(0); // Estado para forzar re-render

  const loadClients = async () => {
    try {
      let clientsDBs = await clientsDB.readClients();
      setClientsfDay(OrderClientsForDay(clientsDBs));
    } catch (error) {
      console.error("Error al cargar clientes desde la base de datos: ", error);
    }
  };

  useEffect(() => {
    const today=new Date()
    setSelectedDay(today.getDay())
    loadClients();
  }, []);

  const handleDayChange = (day:number) => {
    setSelectedDay(day);
    setAnimateKey(prevKey => prevKey + 1); // Incrementa el valor para forzar re-render
  };

  const getPreviousDay = (index:number) => (index === 0 ? workDays.length - 1 : index - 1);
  const getNextDay = (index:number) => (index === workDays.length - 1 ? 0 : index + 1);

  const previousDayIndex = getPreviousDay(selectedDay);
  const nextDayIndex = getNextDay(selectedDay);

  return (
    <div>
      <ClientsSearch></ClientsSearch>
      <div key={animateKey} className='buttonsDash'>
        <button
          onClick={() => handleDayChange(previousDayIndex)}
          className={selectedDay === previousDayIndex ? 'active' : ''}
        >
          {workDays[previousDayIndex]}
        </button>
        <button
          onClick={() => handleDayChange(selectedDay)}
          className='colorAnimateActive'
        >
          {workDays[selectedDay]}
        </button>
        <button
          onClick={() => handleDayChange(nextDayIndex)}
          className={selectedDay === nextDayIndex ? 'active' : ''}
        >
          {workDays[nextDayIndex]}
        </button>
      </div>
      <FeedAdSense></FeedAdSense>
      <ClientsForDay Clients={clientsfDay[selectedDay]} />
    </div>
  );
}
export default ClientDashboard;

function OrderClientsForDay(clients: client[]): client[][] {
  const clientsForDay: client[][] = [];
  
  // Inicializar el array de clientes para cada día de la semana
  for (let i = 0; i < workDays.length; i++) {
      clientsForDay.push([]);
  }
  
  clients.forEach((client) => {
      for (let i = 0; i < workDays.length; i++) {
          if (client.daywork === workDays[i]) {
              clientsForDay[i].push(client);
              break; // Salir del bucle una vez que se ha encontrado el día correspondiente
          }
          if(i+1==workDays.length){
            clientsForDay[7].push(client)
            break
          }
      }
  });

  return clientsForDay;
}
const workDays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
