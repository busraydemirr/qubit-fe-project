export interface BnCreditCardLineModel {
    id?: number;
    code?: string;
    name?: string;
    bankAccDefinition?: string;
    bncrref?: number;
    specode?: string;
    cyphcode?: string;
    crcardtype?: string;
    credittype?: string;
    gksno?: string;
    begdate?: string;
    enddate?: string;
    trcurr?: number;
    trtotal?: number;
    trratecr?: number;
    trrateacc?: number;
    reportrate?: number;
    intrate?: number;
    inttotal?: number;
    commtotal?: number;
}