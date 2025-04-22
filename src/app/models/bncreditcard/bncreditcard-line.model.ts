export interface BnCreditCardLineModel {
    id?: number;
    creditref?: number;
    creditName?: string;
    pernr?: number;
    transtype?: number;
    totalAmount?: number | null;
    inttotal?: number;
    linenr?: number;
    duedate?: string;
    bnAccDefinition?: string;
    bnaccref?: number;
    capiblockNameCreatedby?: string;
    capiblockCreatedby?: number;
    capiblockCreadeddate?: string;
    lineexp?: string;
    total?: number;
}