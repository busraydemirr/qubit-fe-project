import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ClCardStateModel } from "../../models/clcard-state.model";
import { Injectable } from "@angular/core";
import { ClCardActions } from "./clcard.action";
import { ClCardService } from "../../services/clcard.service";
import { tap } from "rxjs";
import { ClCardItemModel } from "../../models/clcard/clcard.model";
import { QueryParams } from "../../models/shared/query-params.model";

@State<ClCardStateModel>({
    name: 'clcard',
    defaults: {
        items: [],
        page: 0,
        size: 10,
        totalElements: 0,
        pages: 0,
        loading: false,
        clCardDetail: null,
        detailLoading: false,
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
    static getClCardQueryParams({ page, size, totalElements, pages }: ClCardStateModel): QueryParams {
        return { page, size, totalElements, pages };
    }

    @Selector()
    static getLoading({ loading }: ClCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getClCardDetail({ clCardDetail }: ClCardStateModel): ClCardItemModel | null {
        return clCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: ClCardStateModel): boolean {
        return detailLoading;
    }

    @Action(ClCardActions.List)
    listClCards({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.List) {
        patchState({ loading: true });
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
        )
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
        )
    }
}