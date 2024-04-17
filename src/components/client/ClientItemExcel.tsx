import type { clientExcelItem } from '../../interfaces/excel/clientexcelitem'

interface ClientItemProps {
  DataClient: clientExcelItem; // Corrección del nombre de la propiedad y del tipo
}
function ClientItemExcel({ DataClient }: ClientItemProps) {

  return (
    <div key={DataClient.client.uuid} className={'clientItemExcel cardClear '}>
        <p className="texthidden"><b>{DataClient.client.name} {DataClient.client.lastname}</b></p>
        <p><b>Colonia:</b>{DataClient.client.neighborhood}</p>
        <p><b>Direccon:</b>{DataClient.client.address}</p>
        <p><b>Ciudad:</b>{DataClient.client.city}</p>
        <p><b>Dia:</b>{DataClient.client.daywork}</p>
        <p><b>Tel:</b>{DataClient.client.phone}</p>
        <p><b>Edad:</b>{DataClient.client.age}</p>
        <p><b>Adeudo:$</b>{DataClient.amount}</p>

    </div>
  )
}
export default ClientItemExcel;