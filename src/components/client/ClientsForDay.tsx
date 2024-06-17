import { paymentsDB } from "../../database/paymentsDBController";
import { chargesDB } from "../../database/chargesDBController";
import type { client } from '../../interfaces/client'
import type { ClientData } from "./ClientItemDash";
import { useEffect, useState } from "react";
import ClientItemDash from "./ClientItemDash";

interface ClientsForDay {
  Clients: client[]
}

function ClientsForDay({Clients}: ClientsForDay) {
  const [clients, setClients] = useState<ClientData[]| null>(null)
  console.log(clients)
  useEffect(() => {
    console.log(Clients)
    async function ConsultClient() {
      try {
        let all: ClientData[] = [];
        for (const client of Clients) {
          console.log(client)
          const clientData = await GetClientData(client);
          console.log(clientData)
          all.push(clientData);
        }
        console.log("VAMOS")
        console.log(all)
        setClients(OrderClients(all));
      } catch (error) {
        console.log("Problema al cargar data de clientes", error);
      }
    }

    ConsultClient();
  }, [Clients]);
  if (clients==null||(clients[0]==undefined && clients.length==1)){
    return(
      <div className=''>

      </div>
    )
  }
  return (
    <div className=''>
      {clients.map((ClientData, index) => (
        <ClientItemDash key={index} ClientData={ClientData} />
      ))}
    </div>
  )
}
export default ClientsForDay;

async function GetClientData(client: client): Promise<ClientData> {
  try {
    const payments = await paymentsDB.findPayments(client.uuid);
    const charges = await chargesDB.findCharges(client.uuid);

    let totalPayments = 0;
    let totalCharges = 0;

    payments.forEach((payment) => {
      totalPayments += payment.amount;
    });

    charges.forEach((charge) => {
      totalCharges += charge.finalprice;
    });
    payments.sort((a, b) => b.createat.getTime() - a.createat.getTime());
    charges.sort((a, b) => b.createat.getTime() - a.createat.getTime());
    const currentDate = new Date();
    const fallbackDate = new Date('2024-05-01');
    
    // Función para validar si una fecha es válida
    function isValidDate(date: any): boolean {
      return date instanceof Date && !isNaN(date.getTime());
  }
    
    // Inicializar lastCharge y lastPayment a null
    let lastCharge = null;
    let lastPayment = null;
    
    // Verificar y calcular lastCharge si charges no está vacío y tiene una fecha válida
    if (charges.length > 0 && isValidDate(new Date(charges[0].createat))) {
        lastCharge = currentDate.getTime() - new Date(charges[0].createat).getTime();
    } else {
        lastCharge = currentDate.getTime() - fallbackDate.getTime();
    }
    
    // Verificar y calcular lastPayment si payments no está vacío y tiene una fecha válida
    if (payments.length > 0 && isValidDate(new Date(payments[0].createat))) {
        lastPayment = currentDate.getTime() - new Date(payments[0].createat).getTime();
    } else {
        lastPayment = currentDate.getTime() - fallbackDate.getTime();
    }

    

    return {
      Client: client,
      Debt: totalCharges - totalPayments,
      LastCharge: Math.floor(lastCharge / (1000 * 3600 * 24)),
      LastPayment: Math.floor(lastPayment / (1000 * 3600 * 24)),
    };
  } catch (error) {
    console.log(client)
    console.log("Tenemos un problema: " + error);
    console.log(error);

    // Return a default or error value here
    return {
      Client: client,
      Debt: 0,
      LastCharge: -1,
      LastPayment: -1,
    };
  }
}

function OrderClients(Clients: ClientData[]): ClientData[] {
  console.log("ORDER")
  console.log(Clients)
  let ClientsFinal: ClientData[] = []
  let ClientBlock: ClientData[] = []
  Clients.sort((a, b) => b.LastPayment - a.LastPayment)
  ClientBlock.push(Clients[0])
  for (let i = 1; i < Clients.length; i++) {
    if (Clients[i].LastPayment == Clients[i - 1].LastPayment) {
      ClientBlock.push(Clients[i])
    } else {
      ClientBlock.sort((a, b) => b.LastCharge - a.LastCharge)
      ClientsFinal.push(...ClientBlock)
      ClientBlock = []
      ClientBlock.push(Clients[i])
    }
  }
  ClientBlock.sort((a, b) => b.LastCharge - a.LastCharge);
  ClientsFinal.push(...ClientBlock);
  console.log(ClientsFinal)
  return ClientsFinal
}