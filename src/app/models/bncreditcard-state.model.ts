import { BnCreditCardLineModel } from "./bncreditcard/bncreditcard-line.model";
import { BnCreditCardItemModel } from "./bncreditcard/bncreditcard.model";

export interface BnCreditCardStateModel {
    items: BnCreditCardItemModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    loading: boolean;
    bnCreditCardDetail: BnCreditCardItemModel;
    detailLoading: boolean;
    linesListLoading: boolean;
    lines: BnCreditCardLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
}