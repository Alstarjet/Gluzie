function formatDate(date:Date|string):string{
    let fecha:Date
    if (typeof date == 'string'){
        fecha=new Date(date)
    }else{
        fecha=date
    }
    const diasSemana: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
    const dia: number = fecha.getDate();
    const diaSemana: string = diasSemana[fecha.getDay()];
    const mes: string = meses[fecha.getMonth()];
    const año: number = fecha.getFullYear();
  
    const hora: number = fecha.getHours(); // Obtener la hora (0-23)
    const minutos: number = fecha.getMinutes();
    const fechaFormateada: string = `${diaSemana}, ${dia} de ${mes} del ${año}, a las ${hora}:${minutos}`;
    return fechaFormateada
}
export default formatDate