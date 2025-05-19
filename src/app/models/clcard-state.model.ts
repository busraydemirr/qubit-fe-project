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
    cardLines1: ClCardLineModel[];
    linePage1: number;
    lineSize1: number;
    lineTotalElements1: number;
    linePages1: number;
    cardLines2: ClCardLineModel[];
    linePage2: number;
    lineSize2: number;
    lineTotalElements2: number;
    linePages2: number;
    linesListLoading2: boolean;
    linesListLoading1: boolean;
}