import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCardActions } from "./bncard.action";
import { BnCardStateModel } from "../../models/bncard-state.model";
import { BnCardService } from "../../services/bncard.service";
import { BnCardItemModel } from "../../models/bncard/bncard.model";
import { QueryParams } from "../../models/shared/query-params.model";
import { BnCardAccountModel } from "../../models/bncard/bncard-account.model";

@State<BnCardStateModel>({
    name: 'bncard',
    defaults: {
        items: [],
        page: 0,
        size: 10,
        totalElements: 0,
        pages: 0,
        loading: false,
        bnCardDetail: null,
        detailLoading: false,
        accountListLoading: false,
        cardAccounts: [],
        accountPage: 0,
        accountSize: 10,
        accountTotalElements: 0,
        accountPages: 0,
    }
})
@Injectable()
export class BnCardState {
    constructor(private _bnCardService: BnCardService) { }

    @Selector()
    static getBnCards({ items }: BnCardStateModel): BnCardItemModel[] {
        return items;
    }

    @Selector()
    static getBnCardQueryParams({ page, size, totalElements, pages }: BnCardStateModel): QueryParams {
        return { page, size, totalElements, pages };
    }

    @Selector()
    static getLoading({ loading }: BnCardStateModel): boolean {
        return loading;
    }

    @Selector()
    static getBnCardDetail({ bnCardDetail }: BnCardStateModel): BnCardItemModel | null {
        return bnCardDetail;
    }

    @Selector()
    static getDetailLoading({ detailLoading }: BnCardStateModel): boolean {
        return detailLoading;
    }

    @Selector()
    static getBnCardAccounts({ cardAccounts }: BnCardStateModel): BnCardAccountModel[] {
        return cardAccounts;
    }

    @Selector()
    static getAccountListLoading({ accountListLoading }: BnCardStateModel): boolean {
        return accountListLoading;
    }

    @Selector()
    static getBnCardAccountsQueryParams({ accountPage, accountSize, accountTotalElements, accountPages }: BnCardStateModel): QueryParams {
        return { page: accountPage, size: accountSize, totalElements: accountTotalElements, pages: accountPages };
    }

    @Action(BnCardActions.List)
    listBnCards({ patchState }: StateContext<BnCardStateModel>, action: BnCardActions.List) {
        patchState({ loading: true });
        return this._bnCardService.listBnCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
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

    @Action(BnCardActions.SetBnCard)
    setBnCard({ patchState }: StateContext<BnCardStateModel>, action: BnCardActions.SetBnCard) {
        patchState({ bnCardDetail: action.payload });
    }

    @Action(BnCardActions.GetBnCard)
    getBnCard({ dispatch, patchState }: StateContext<BnCardStateModel>, action: BnCardActions.GetBnCard) {
        const filter = {
            field: 'id',
            value: action.payload.toString(),
            operator: 'eq',
        };
        patchState({ detailLoading: true });
        return this._bnCardService.listBnCards(1, 0, { filter }).pipe(
            tap(data => {
                patchState({ detailLoading: false });
                dispatch(new BnCardActions.SetBnCard(data.data.items[0]));
            })
        );
    }

    @Action(BnCardActions.GetBnCardAccounts)
    getBnCardAccounts({ patchState }: StateContext<BnCardStateModel>, action: BnCardActions.GetBnCardAccounts) {
        patchState({ accountListLoading: true });
        return this._bnCardService.getBnCardAccounts(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => {
                patchState({
                    cardAccounts: data.data.items,
                    accountPage: data.data.index,
                    accountSize: data.data.size,
                    accountTotalElements: data.data.count,
                    accountPages: data.data.pages,
                    accountListLoading: false
                });
            })
        );
    }
}