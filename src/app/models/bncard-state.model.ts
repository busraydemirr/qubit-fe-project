import { BnCardAccountLineModel } from "./bncard/bncard-account-line.model";
import { BnCardAccountModel } from "./bncard/bncard-account.model";
import { BnCardItemModel } from "./bncard/bncard.model";
import { FilterRequestModel } from "./shared/filter-request.model";

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
    lineFilter: FilterRequestModel | null;
    accountFilter: FilterRequestModel | null;
    filter: FilterRequestModel | null;
}