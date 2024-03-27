interface payment {
    clientuuid: string,
    clientname: string,
    uuid: string,
    amount: number,
    method: string,
    concept: string,
    date: Date,
    cloud: 0 | 1,
}
export type{payment}