export interface ConsentInfo{
    institution: {id: number, name: string},
    consents: Array<Consent>
}

export interface Consent {

    srno: number,
    subscriberName: string,
    consentId: string,
    createdDate: Date,
    startDate: Date,
    endDate: Date,
    dataFetchCount: number,
    status: string,
    purpose: string,
    consentUse: {
        count: number,
        lastUseDateTime: Date
    },
    fiType: Array<string>
}