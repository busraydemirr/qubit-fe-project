import { ClCardItemModel } from "./clcard/clcard.model";

export interface ClCardStateModel {
    items: ClCardItemModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    loading: boolean;
    clCardDetail: ClCardItemModel | null;
    detailLoading: boolean;
}