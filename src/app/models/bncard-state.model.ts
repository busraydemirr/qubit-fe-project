import { BnCardAccountLineModel } from "./bncard/bncard-account-line.model";
import { BnCardAccountModel } from "./bncard/bncard-account.model";
import { BnCardItemModel } from "./bncard/bncard.model";

export interface BnCardStateModel {
    items: BnCardItemModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    loading: boolean;
    bnCardDetail: BnCardItemModel | null;
    detailLoading: boolean;
    accountListLoading: boolean;
    cardAccounts: BnCardAccountModel[];
    accountPage: number;
    accountSize: number;
    accountTotalElements: number;
    accountPages: number;
    lineLoading: boolean;
    accountLines: BnCardAccountLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
}