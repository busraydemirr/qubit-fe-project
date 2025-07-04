import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ClCardStateModel } from "../../models/clcard-state.model";
import { Injectable } from "@angular/core";
import { ClCardActions } from "./clcard.action";
import { ClCardService } from "../../services/clcard.service";
import { tap } from "rxjs";
import { ClCardItemModel } from "../../models/clcard/clcard.model";
import { QueryParams } from "../../models/shared/query-params.model";
import { ClCardLineModel } from "../../models/clcard/clcard-line.model";
import { ClCardTotalModel } from "../../models/clcard/clcard-total.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

@State<ClCardStateModel>({
    name: 'clcard',
    defaults: {
        items: [{ select: false, id: 1, code: 'test', definition: '' }, { select: false, id: 1, code: 'test', definition: '' }, { select: false, id: 1, code: 'test', definition: '' }],
        page: 0,
        size: 10,
        totalElements: 0,
        pages: 0,
        loading: false,
        clCardDetail: {},
        filter: {},
        term: '03',
        detailLoading: false,
        linesListLoading: false,
        cardLines: [{
            id: 1,
            date: new Date().toISOString(),
            lineexp: '',
            sign: 1,
            amount: 100
        }, {
            id: 1,
            date: new Date().toISOString(),
            lineexp: '',
            sign: 1,
            amount: 100
        }, {
            id: 1,
            date: new Date().toISOString(),
            lineexp: '',
            sign: 1,
            amount: 100
        }],
        linePage: 0,
        lineSize: 10,
        lineTotalElements: 0,
        linePages: 0,
        totals: {},
        lineFilter: null,
    }
})
@Injectable()
export class ClCardState {
    constructor(private _clCardService: ClCardService) { }

    @Selector()
    static getClCards({ items }: ClCardStateModel): ClCardItemModel[] {
        return items;
    }

    @Selector()
    static getClCardFilter({ filter }: ClCardStateModel): FilterRequestModel {
        return filter;
    }

    @Selector()
    static getClCardQueryParams({ page, size, totalElements, pages }: ClCardStateModel): QueryParams {
        return { page, size, totalElements, pages };
    }

    @Selector()
    static getLoading({ loading }: ClCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getClCardDetail({ clCardDetail }: ClCardStateModel): ClCardItemModel | undefined {
        return clCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: ClCardStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getClCardLines({ cardLines }: ClCardStateModel): ClCardLineModel[] {
        return cardLines;
    }

    @Selector()
    static getLinesListLoading({ linesListLoading }: ClCardStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getLinesFilter({ lineFilter }: ClCardStateModel): any {
        return lineFilter;
    }


    @Selector()
    static getClCardLineQueryParams({ linePage, lineSize, lineTotalElements, linePages,
    }: ClCardStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }


    @Selector()
    static getClCardTotals({ totals }: ClCardStateModel): ClCardTotalModel {
        return totals;
    }

    @Action(ClCardActions.List)
    listClCards({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.List) {
        patchState({ loading: true, filter: action.payload.filter });
        return this._clCardService.listClCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    items: data.data.items,
                    page: data.data.index,
                    size: data.data.size,
                    totalElements: data.data.count,
                    pages: data.data.pages,
                    loading: false
                });
            })
        );
    }

    @Action(ClCardActions.GetClCardTotals)
    getClCardTotals({ patchState, getState }: StateContext<ClCardStateModel>, action: ClCardActions.GetClCardTotals) {
        const { term } = getState();
        patchState({ linesListLoading: true });
        return this._clCardService.getClCardTotals(action.payload, {}, '03').pipe(
            tap(data => {
                patchState({
                    totals: {
                        totalDebt: data.data.totalDebt,
                        totalCredit: data.data.totalCredit,
                        totalAmount: data.data.totalAmount,
                    },
                    linesListLoading: false
                });
            })
        );
    }

    @Action(ClCardActions.ResetQueryParams)
    resetQueryParams({ patchState }: StateContext<ClCardStateModel>) {
        patchState({
            page: 0,
            size: 10,
            totalElements: 0,
            pages: 0,
            filter: {},
        });
    }

    @Action(ClCardActions.SetClCard)
    setClCard({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.SetClCard) {
        patchState({ clCardDetail: action.payload });
    }

    @Action(ClCardActions.GetClCard)
    getClCard({ dispatch, patchState }: StateContext<ClCardStateModel>, action: ClCardActions.GetClCard) {
        const filter = {
            field: 'id',
            value: action.payload.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._clCardService.listClCards(1, 0, { filter }).pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new ClCardActions.SetClCard(data.data.items[0]));
            })
        );
    }

    @Action(ClCardActions.GetClCardLines)
    getClCardLines({ patchState, dispatch }: StateContext<ClCardStateModel>, action: ClCardActions.GetClCardLines) {

        patchState({ linesListLoading: true, term: action.payload.term });
        return this._clCardService.getClCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    lineFilter: action.payload.filter,
                    cardLines: data.data.items,
                    linePage: data.data.index,
                    lineSize: data.data.size,
                    lineTotalElements: data.data.count,
                    linePages: data.data.pages,
                    linesListLoading: false
                });


                dispatch(new ClCardActions.GetClCardTotals(action.payload.id));
            })
        );
    }
}