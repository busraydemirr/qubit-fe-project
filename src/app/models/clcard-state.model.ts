import { ClCardLineModel } from "./clcard/clcard-line.model";
import { ClCardTotalModel } from "./clcard/clcard-total.model";
import { ClCardItemModel } from "./clcard/clcard.model";
import { FilterRequestModel } from "./shared/filter-request.model";

export interface ClCardStateModel {
    items: ClCardItemModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    loading: boolean;
    clCardDetail: ClCardItemModel;
    detailLoading: boolean;
    linesListLoading: boolean;
    cardLines: ClCardLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
    filter: FilterRequestModel;
    term: string;
    totals: ClCardTotalModel;                      
}