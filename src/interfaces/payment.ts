interface payment {
    clientuuid: string,
    clientname: string,
    uuid: string,
    amount: number,
    method: string,
    concept: string,
    createat:Date,
    updateat:Date
    cloud: 0 | 1,
    status:"deleted"|"active"
}
export type{payment}