import { KsCardModel } from "./kscard/kscard.model";

export interface KsCardStateModel {
    loading: boolean;
    items: KsCardModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    ksCardDetail: KsCardModel;
    detailLoading: boolean;
}