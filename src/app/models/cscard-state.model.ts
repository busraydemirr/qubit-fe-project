import { CsCardLineModel } from "./cscard/cscard-line.model";
import { CsCardModel } from "./cscard/cscard.model";
import { FilterRequestModel } from "./shared/filter-request.model";

export interface CsCardStateModel { 
    cekItems: CsCardModel[];
    pimakItems: CsCardModel[];
    cekPage: number;
    cekSize: number;
    cekTotalElements: number;
    cekPages: number;
    pimakPage: number;
    pimakSize: number;
    pimakTotalElements: number;
    pimakPages: number;
    loading: boolean;
    csCardDetail: CsCardModel;
    detailLoading: boolean;
    linesListLoading: boolean;
    csCardLines: CsCardLineModel[];
    linePage: number;
    lineSize: number;
    lineTotalElements: number;
    linePages: number;
    pimakFilter: FilterRequestModel;
    cekFilter: FilterRequestModel;
}