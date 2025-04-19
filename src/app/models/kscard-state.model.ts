import { KsCardLineModel } from "./kscard/kscard-line.model";
import { KsCardModel } from "./kscard/kscard.model";
import { FilterRequestModel } from "./shared/filter-request.model";

export interface KsCardStateModel {
    loading: boolean;
    items: KsCardModel[];
    page: number;
    size: number;
    totalElements: number;
    pages: number;
    ksCardDetail: KsCardModel;
    detailLoading: boolean;
    linesListLoading: boolean;
    cardLines: KsCardLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
    cardLineFilter: FilterRequestModel;
    filter: FilterRequestModel;
}