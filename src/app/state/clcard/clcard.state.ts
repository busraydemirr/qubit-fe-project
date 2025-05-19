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
        cardLines1: [],
        linePage1: 0,
        lineSize1: 10,
        lineTotalElements1: 0,
        linePages1: 0,
        cardLines2: [],
        linePage2: 0,
        lineSize2: 10,
        lineTotalElements2: 0,
        linePages2: 0,
        totals: {},
        linesListLoading2: false,
        linesListLoading1: false,
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
    static getClCardLines2({ cardLines2 }: ClCardStateModel): ClCardLineModel[] {
        return cardLines2;
    }

    @Selector()
    static getClCardLines1({ cardLines1 }: ClCardStateModel): ClCardLineModel[] {
        return cardLines1;
    }

    @Selector()
    static getLinesListLoading({ linesListLoading }: ClCardStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getLinesListLoading2({ linesListLoading2 }: ClCardStateModel): boolean {
        return linesListLoading2;
    }

    @Selector()
    static getLinesListLoading1({ linesListLoading1 }: ClCardStateModel): boolean {
        return linesListLoading1;
    }

    @Selector()
    static getClCardLineQueryParams({ linePage, lineSize, lineTotalElements, linePages,
    }: ClCardStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }

    @Selector()
    static getClCardLineQueryParams2({
        linePage2, lineSize2, lineTotalElements2, linePages2,
    }: ClCardStateModel): QueryParams {
        return { page: linePage2, size: lineSize2, totalElements: lineTotalElements2, pages: linePages2 };
    }

    @Selector()
    static getClCardLineQueryParams1({
        linePage1, lineSize1, lineTotalElements1, linePages1 }: ClCardStateModel): QueryParams {
        return { page: linePage1, size: lineSize1, totalElements: lineTotalElements1, pages: linePages1 };
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
        console.log('getClCardLines', action.payload.term);
        patchState({ linesListLoading: true, term: action.payload.term });
        return this._clCardService.getClCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
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


    @Action(ClCardActions.GetClCardLines2)
    getClCardLines2({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.GetClCardLines2) {
        console.log('getClCardLines2', action.payload.term);
        patchState({ linesListLoading2: true, term: action.payload.term });
        return this._clCardService.getClCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    cardLines2: data.data.items,
                    linePage2: data.data.index,
                    lineSize2: data.data.size,
                    lineTotalElements2: data.data.count,
                    linePages2: data.data.pages,
                    linesListLoading2: false
                });
            })
        );
    }



    @Action(ClCardActions.GetClCardLines1)
    getClCardLines1({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.GetClCardLines1) {
        console.log('getClCardLines1', action.payload.term);
        patchState({ linesListLoading1: true, term: action.payload.term });
        return this._clCardService.getClCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    cardLines1: data.data.items,
                    linePage1: data.data.index,
                    lineSize1: data.data.size,
                    lineTotalElements1: data.data.count,
                    linePages1: data.data.pages,
                    linesListLoading1: false
                });
            })
        );
    }
}