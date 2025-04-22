export interface CsCardModel {
    id?: number;
    bankAccDefinition?: null | string;
    doc?: number;
    currstat?: number;
    portfoyno?: string;
    bankname?: string;
    specode?: string;
    city?: string;
    owing?: string;
    kefil?: string;
    branch?: number;
    duedate?: string | Date;
    setdate?: string | Date;
    amount?: number;
    trcurr?: number;
    trrate?: number;
    trnet?: number;
    reportrate?: number;
    reportnet?: number;
    devir?: number;
    inuse?: number;
    capiblockCreadeddate?: string | Date;
    bnbranchno?: string;
    bnaccountno?: string;
    taxnr?: string;
    bncreref?: number;
    iban?: string;
  }