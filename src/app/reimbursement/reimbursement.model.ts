export interface Reimbursement {
    reimbId: number,
    amount: number,
    dateSubmitted: string,
    dateResolved: string,
    description: string,
    author: number,
    resolver: number,
    status: string,
    type: string
}