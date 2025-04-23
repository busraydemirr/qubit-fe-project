import { OrficheLineModel } from "./orfiche/orfiche-line.model";
import { OrficheModel } from "./orfiche/orfiche.model";
import { FilterRequestModel } from "./shared/filter-request.model";

export interface OrficheStateModel {
    placedItems: OrficheModel[];
    receivedItems: OrficheModel[];
    placedPage: number;
    placedSize: number;
    placedTotalElements: number;
    placedPages: number;
    receivedPage: number;
    receivedSize: number;
    receivedTotalElements: number;
    receivedPages: number;
    loading: boolean;
    orficheDetail: OrficheModel;
    detailLoading: boolean;
    orficheLines: OrficheLineModel[];
    linesListLoading: boolean;
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
    receivedListFilters: FilterRequestModel;
    placedListFilters: FilterRequestModel;
    placedTerm: string;
    receivedTerm: string;
}