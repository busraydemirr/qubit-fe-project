import { CurrencyType } from "../shared/currency.enum";

export interface BnCreditCardItemModel {
    id?: number;
    code?:string;
    name?:string;
    bankAccDefinition?: string;
    bncrref?: number;
    specode?: string;
    cyphcode?: string;
    crcardtype?: string;
    credittype?: number;
    gksno?: string;
    begdate?: string;
    enddate?: string;
    trcurr?: CurrencyType;
    trtotal?: number;
    trratecr?: number;
    trrateacc?: number;
    reportrate?: number;
    intrate?: number;
    inttotal?: number;
    commtotal?: number;
}