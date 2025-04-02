import { Action, Selector, State, StateContext } from "@ngxs/store";
import { KsCardStateModel } from "../../models/kscard-state.model";
import { Injectable } from "@angular/core";
import { KsCardService } from "../../services/kscard.service";
import { KsCardModel } from "../../models/kscard/kscard.model";
import { QueryParams } from "../../models/shared/query-params.model";
import { KsCardActions } from "./kscard.action";
import { tap } from "rxjs";

@State<KsCardStateModel>({
    name: 'kscard',
    defaults: {
        items: [{ select: false, id: 1, code: 'test', name: '' }, { select: false, id: 1, code: 'test', name: '' }, { select: false, id: 1, code: 'test', name: '' }],
        page: 0,
        size: 10,
        totalElements: 0,
        pages: 0,
        loading: false,
        ksCardDetail: {},
        detailLoading: false,
    }
})
@Injectable()
export class KsCardState {
    constructor(private _ksCardService: KsCardService) { }

    @Selector()
    static getKsCards({ items }: KsCardStateModel): KsCardModel[] {
        return items;
    }

    @Selector()
    static getKsCardQueryParams({ page, size, totalElements, pages }: KsCardStateModel): QueryParams {
        return { page, size, totalElements, pages };
    }

    @Selector()
    static getLoading({ loading }: KsCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getKsCardDetail({ ksCardDetail }: KsCardStateModel): KsCardModel {
        return ksCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: KsCardStateModel): boolean {
        return detailLoading;
    }


    @Action(KsCardActions.List)
    listKsCards({ patchState }: StateContext<KsCardStateModel>, action: KsCardActions.List) {
        patchState({ loading: true });
        return this._ksCardService.listKsCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                console.log(data);
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

    @Action(KsCardActions.SetKsCard)
    setKsCard({ patchState }: StateContext<KsCardStateModel>, action: KsCardActions.SetKsCard) {
        patchState({ ksCardDetail: action.payload });
    }

     @Action(KsCardActions.GetKsCard)
        getClCard({ dispatch, patchState }: StateContext<KsCardStateModel>, action: KsCardActions.GetKsCard) {
            const filter = {
                field: 'id',
                value: action.payload.toString(),
                operator: 'eq',
            };
            patchState({ detailLoading: true });
            return this._ksCardService.listKsCards(1, 0, { filter }).pipe(
                tap(data => {
                    patchState({ detailLoading: false });
                    dispatch(new KsCardActions.SetKsCard(data.data.items[0]));
                })
            );
        }
    
}