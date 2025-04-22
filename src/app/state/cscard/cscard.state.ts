import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { QueryParams } from "../../models/shared/query-params.model";
import { tap } from "rxjs";
import { CsCardStateModel } from "../../models/cscard-state.model";
import { CsCardService } from "../../services/cscard.service";
import { CsCardLineModel } from "../../models/cscard/cscard-line.model";
import { CsCardModel } from "../../models/cscard/cscard.model";
import { CsCardActions } from "./cscard.action";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

@State<CsCardStateModel>({
    name: 'cscard',
    defaults: {
        cekItems: [{ owing: 'Test', bankname: 'Test' }, { owing: 'Test', bankname: 'Test' }, { owing: 'Test', bankname: 'Test' }],
        pimakItems: [{ owing: 'Test', bankname: 'Test' }, { owing: 'Test', bankname: 'Test' }, { owing: 'Test', bankname: 'Test' }],
        cekPage: 0,
        cekSize: 10,
        cekTotalElements: 0,
        cekPages: 0,
        pimakPage: 0,
        pimakSize: 10,
        pimakTotalElements: 0,
        pimakPages: 0,
        pimakFilter: {},
        cekFilter: {},
        cekTerm: '03',
        pimakTerm: '03',
        loading: false,
        csCardDetail: {},
        detailLoading: false,
        linesListLoading: false,
        csCardLines: [{
            devir: 21,
            clCardDefinition: '',
        }, {
            devir: 21,
            clCardDefinition: '',
        }, {
            devir: 21,
            clCardDefinition: '',
        }],
        linePage: 0,
        lineSize: 10,
        lineTotalElements: 0,
        linePages: 0,
    }
})
@Injectable()
export class CsCardState {
    constructor(private _csCardService: CsCardService) { }

    @Selector()
    static getCekItems({ cekItems }: CsCardStateModel): CsCardModel[] {
        return cekItems;
    }

    @Selector()
    static getPimakList({ pimakItems }: CsCardStateModel): CsCardModel[] {
        return pimakItems;
    }

    @Selector()
    static getCekFilter({ cekFilter }: CsCardStateModel): FilterRequestModel {
        return cekFilter;
    }

    @Selector()
    static getPimakFilter({ pimakFilter }: CsCardStateModel): FilterRequestModel {
        return pimakFilter;
    }

    @Selector()
    static getCekTerm({ cekTerm }: CsCardStateModel): string {
        return cekTerm;
    }

    @Selector()
    static getPimakTerm({ pimakTerm }: CsCardStateModel): string {
        return pimakTerm;
    }

    @Selector()
    static getCekQueryParams({ cekPage, cekSize, cekTotalElements, cekPages }: CsCardStateModel): QueryParams {
        return { page: cekPage, size: cekSize, totalElements: cekTotalElements, pages: cekPages };
    }

    @Selector()
    static getpimakQueryParams({ pimakPage, pimakSize, pimakTotalElements, pimakPages }: CsCardStateModel): QueryParams {
        return { page: pimakPage, size: pimakSize, totalElements: pimakTotalElements, pages: pimakPages };
    }

    @Selector()
    static getLoading({ loading }: CsCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getCsCardDetail({ csCardDetail }: CsCardStateModel): CsCardModel {
        return csCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: CsCardStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getCsCardLines({ csCardLines }: CsCardStateModel): CsCardLineModel[] {
        return csCardLines;
    }

    @Selector()
    static getLinesListLoading({ linesListLoading }: CsCardStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getCsCardLineQueryParams({ linePage, lineSize, lineTotalElements, linePages }: CsCardStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }


    @Action(CsCardActions.CsCardCekList)
    csCardCekList({ patchState }: StateContext<CsCardStateModel>, action: CsCardActions.CsCardCekList) {
        patchState({ loading: true, cekFilter: action.payload.filter, cekTerm: action.payload.term });
        return this._csCardService.listCekCard(action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    cekItems: data.data.items,
                    cekPage: data.data.index,
                    cekSize: data.data.size,
                    cekTotalElements: data.data.count,
                    cekPages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(CsCardActions.CsCardPimakList)
    listPimakCard({ patchState }: StateContext<CsCardStateModel>, action: CsCardActions.CsCardPimakList) {
        patchState({ loading: true, pimakFilter: action.payload.filter, pimakTerm: action.payload.term });
        return this._csCardService.listPimakCard(action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    pimakItems: data.data.items,
                    pimakPage: data.data.index,
                    pimakSize: data.data.size,
                    pimakTotalElements: data.data.count,
                    pimakPages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(CsCardActions.SetCsCard)
    setCsCard({ patchState }: StateContext<CsCardStateModel>, action: CsCardActions.SetCsCard) {
        patchState({ csCardDetail: action.payload });
    }

    @Action(CsCardActions.GetCsCard)
    getCsCard({ dispatch, patchState }: StateContext<CsCardStateModel>, action: CsCardActions.GetCsCard) {
        const filter = {
            field: 'id',
            value: action.payload.id.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._csCardService.listCsCards(1, 0, { filter }, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new CsCardActions.SetCsCard(data.data.items[0]));
            })
        );
    }

    @Action(CsCardActions.GetCsCardLines)
    getCsCardLines({ patchState }: StateContext<CsCardStateModel>, action: CsCardActions.GetCsCardLines) {
        patchState({ linesListLoading: true });
        return this._csCardService.getCsCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    csCardLines: data.data.items,
                    linePage: data.data.index,
                    lineSize: data.data.size,
                    lineTotalElements: data.data.count,
                    linePages: data.data.pages,
                    linesListLoading: false
                });
            })
        );
    }

}