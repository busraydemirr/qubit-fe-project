import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { QueryParams } from "../../models/shared/query-params.model";
import { tap } from "rxjs";
import { OrficheStateModel } from "../../models/orfiche-state.model";
import { OrficheService } from "../../services/orfiche.service";
import { OrficheModel } from "../../models/orfiche/orfiche.model";
import { OrficheLineModel } from "../../models/orfiche/orfiche-line.model";
import { OrficheActions } from "./orfiche.action";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

@State<OrficheStateModel>({
    name: 'orfiche',
    defaults: {
        placedItems: [{ id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }],
        receivedItems: [{ id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }, { id: 1, ficheno: 'test', clCardDefinition: '' }],
        placedPage: 0,
        placedSize: 10,
        placedTotalElements: 0,
        placedPages: 0,
        receivedPage: 0,
        receivedSize: 10,
        receivedTotalElements: 0,
        receivedPages: 0,
        loading: false,
        orficheDetail: {},
        detailLoading: false,
        linesListLoading: false,
        orficheLines: [{
            id: 11,
            itemCode: '11',
            itemName: '',
        }, {
            id: 11,
            itemCode: '11',
            itemName: '',
        }, {
            id: 11,
            itemCode: '11',
            itemName: '',
        }],
        linePage: 0,
        lineSize: 10,
        lineTotalElements: 0,
        linePages: 0,
        receivedListFilters: {},
        placedListFilters: {},
        placedTerm: '03',
        receivedTerm: '03',
    }
})
@Injectable()
export class OrficheState {
    constructor(private _orficheService: OrficheService) { }

    @Selector()
    static getplacedorfiches({ placedItems }: OrficheStateModel): OrficheModel[] {
        return placedItems;
    }

    @Selector()
    static getreceivedorfiches({ receivedItems }: OrficheStateModel): OrficheModel[] {
        return receivedItems;
    }

    @Selector()
    static getPlacedOrficheQueryParams({ placedPage, placedSize, placedTotalElements, placedPages }: OrficheStateModel): QueryParams {
        return { page: placedPage, size: placedSize, totalElements: placedTotalElements, pages: placedPages };
    }

    @Selector()
    static getreceivedorficheQueryParams({ receivedPage, receivedSize, receivedTotalElements, receivedPages }: OrficheStateModel): QueryParams {
        return { page: receivedPage, size: receivedSize, totalElements: receivedTotalElements, pages: receivedPages };
    }

    @Selector()
    static getLoading({ loading }: OrficheStateModel): boolean {
        return loading;
    }

    @Selector()
    static getorficheDetail({ orficheDetail }: OrficheStateModel): OrficheModel {
        return orficheDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: OrficheStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getorficheLines({ orficheLines }: OrficheStateModel): OrficheLineModel[] {
        return orficheLines;
    }

    @Selector()
    static getLinesListLoading({ linesListLoading }: OrficheStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getorficheLineQueryParams({ linePage, lineSize, lineTotalElements, linePages }: OrficheStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }

    @Selector()
    static getPlacedOrficheFilters({ placedListFilters }: OrficheStateModel): FilterRequestModel {
        return placedListFilters;
    }

    @Selector()
    static getReceivedOrficheFilters({ receivedListFilters }: OrficheStateModel): FilterRequestModel {
        return receivedListFilters;
    }
    @Selector()
    static getPlacedOrficheTerm({ placedTerm }: OrficheStateModel): string {
        return placedTerm;
    }

    @Selector()
    static getReceivedOrficheTerm({ receivedTerm }: OrficheStateModel): string {
        return receivedTerm;
    }

    @Action(OrficheActions.PlacedOrficheList)
    listplacedorfiches({ patchState }: StateContext<OrficheStateModel>, action: OrficheActions.PlacedOrficheList) {
        patchState({ loading: true, placedListFilters: action.payload.filter, placedTerm: action.payload.term });
        return this._orficheService.listPlacedOrfiche(action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    placedItems: data.data.items,
                    placedPage: data.data.index,
                    placedSize: data.data.size,
                    placedTotalElements: data.data.count,
                    placedPages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(OrficheActions.ReceivedOrficheList)
    listreceivedorfiches({ patchState }: StateContext<OrficheStateModel>, action: OrficheActions.ReceivedOrficheList) {
        patchState({ loading: true, receivedListFilters: action.payload.filter, receivedTerm: action.payload.term });
        return this._orficheService.listReceivedOrfiche(action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    receivedItems: data.data.items,
                    receivedPage: data.data.index,
                    receivedSize: data.data.size,
                    receivedTotalElements: data.data.count,
                    receivedPages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(OrficheActions.SetOrfiche)
    setorfiche({ patchState }: StateContext<OrficheStateModel>, action: OrficheActions.SetOrfiche) {
        patchState({ orficheDetail: action.payload });
    }

    @Action(OrficheActions.GetOrfiche)
    getorfiche({ dispatch, patchState }: StateContext<OrficheStateModel>, action: OrficheActions.GetOrfiche) {
        const filter = {
            field: 'id',
            value: action.payload.id.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._orficheService.listOrfiches(1, 0, { filter }, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new OrficheActions.SetOrfiche(data.data.items[0]));
            })
        );
    }

    @Action(OrficheActions.GetOrficheLines)
    getorficheLines({ patchState }: StateContext<OrficheStateModel>, action: OrficheActions.GetOrficheLines) {
        patchState({ linesListLoading: true });
        return this._orficheService.getOrficheLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    orficheLines: data.data.items,
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