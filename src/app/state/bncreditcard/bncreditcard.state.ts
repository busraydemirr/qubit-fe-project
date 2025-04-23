import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCreditCardStateModel } from "../../models/bncreditcard-state.model";
import { BnCreditCardService } from "../../services/bn-credit-card.service";
import { BnCreditCardActions } from "./bncreditcard.action";
import { BnCreditCardItemModel } from "../../models/bncreditcard/bncreditcard.model";
import { QueryParams } from "../../models/shared/query-params.model";
import { BnCreditCardLineModel } from "../../models/bncreditcard/bncreditcard-line.model";

@State<BnCreditCardStateModel>({
    name: 'bncreditcard',
    defaults: {
        items: [],
        page: 0,
        size: 10,
        totalElements: 0,
        pages: 0,
        loading: false,
        bnCreditCardDetail: {},
        detailLoading: false,
        linesListLoading: false,
        lines: [{
            id: 1,

        }, {
            id: 1,

        }, {
            id: 1,

        }],
        linePage: 0,
        lineSize: 10,
        lineTotalElements: 0,
        linePages: 0,
    }
})
@Injectable()
export class BnCreditCardState {
    constructor(private _bnCreditCardService: BnCreditCardService) { }

    @Selector()
    static getBnCreditCards({ items }: BnCreditCardStateModel): BnCreditCardItemModel[] {
        return items;
    }

    @Selector()
    static getBnCreditCardQueryParams({ page, size, totalElements, pages }: BnCreditCardStateModel): QueryParams {
        return { page, size, totalElements, pages };
    }

    @Selector()
    static getLoading({ loading }: BnCreditCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getBnCreditCardDetail({ bnCreditCardDetail }: BnCreditCardStateModel): BnCreditCardItemModel | null {
        return bnCreditCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: BnCreditCardStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getBnCreditCardLines({ lines }: BnCreditCardStateModel): BnCreditCardLineModel[] {
        return lines;
    }

    @Selector()
    static getLineListLoading({ linesListLoading }: BnCreditCardStateModel): boolean {
        return linesListLoading;
    }

    @Selector()
    static getBnCreditCardLinesQueryParams({ linePage, lineSize, lineTotalElements, linePages }: BnCreditCardStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }

    @Action(BnCreditCardActions.List)
    listBnCreditCards({ patchState }: StateContext<BnCreditCardStateModel>, action: BnCreditCardActions.List) {
        patchState({ loading: true });
        return this._bnCreditCardService.listBnCreditCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
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

    @Action(BnCreditCardActions.SetBnCreditCard)
    setBnCreditCard({ patchState }: StateContext<BnCreditCardStateModel>, action: BnCreditCardActions.SetBnCreditCard) {
        patchState({ bnCreditCardDetail: action.payload });
    }

    @Action(BnCreditCardActions.GetBnCreditCard)
    getBnCreditCard({ dispatch, patchState }: StateContext<BnCreditCardStateModel>, action: BnCreditCardActions.GetBnCreditCard) {
        const filter = {
            field: 'id',
            value: action.payload.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._bnCreditCardService.listBnCreditCards(1, 0, { filter }).pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new BnCreditCardActions.SetBnCreditCard(data.data.items[0]));
            })
        );
    }

    @Action(BnCreditCardActions.GetBnCreditCardLines)
    getBnCreditCardAccounts({ patchState }: StateContext<BnCreditCardStateModel>, action: BnCreditCardActions.GetBnCreditCardLines) {
        patchState({ linesListLoading: true });
        return this._bnCreditCardService.listBnCreditCardLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    lines: data.data.items,
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