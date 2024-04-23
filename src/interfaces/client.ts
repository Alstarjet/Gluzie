interface client{
    uuid: string,
    name: string,
    lastname: string,
    age: number,
    city: string,
    neighborhood: string,
    address: string,
    phone: string,
    daywork: string,
    cloud: 0 | 1,
    createat:Date,
    updateat:Date
    status:"deleted"|"active"
}
export type{client}