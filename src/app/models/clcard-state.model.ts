import { ClCardLineModel } from "./clcard/clcard-line.model";
import { ClCardItemModel } from "./clcard/clcard.model";

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
}