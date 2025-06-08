import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCardActions } from "./bncard.action";
import { BnCardStateModel } from "../../models/bncard-state.model";
import { BnCardService } from "../../services/bncard.service";
import { BnCardItemModel } from "../../models/bncard/bncard.model";
import { QueryParams } from "../../models/shared/query-params.model";
import { BnCardAccountModel } from "../../models/bncard/bncard-account.model";
import { BnCardAccountLineModel } from "../../models/bncard/bncard-account-line.model";
import { FilterRequestModel } from "../../models/shared/filter-request.model";

@State<BnCardStateModel>({
    name: 'bncard',
    defaults: {
        items: [{ select: false, id: 1, code: 'test', definition: '' }, { select: false, id: 1, code: 'test', definition: '' }, { select: false, id: 1, code: 'test', definition: '' }],
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
        lineLoading: false,
        accountLines: [],
        linePage: 0, lineSize: 10, lineTotalElements: 0, linePages: 0,
        lineFilter: null,
        accountFilter: null,
        filter: null
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

    @Selector()
    static getLineLoading({ lineLoading }: BnCardStateModel): boolean {
        return lineLoading;
    }

    @Selector()
    static getAccountLines({ accountLines }: BnCardStateModel): BnCardAccountLineModel[] {
        return accountLines;
    }

    @Selector()
    static getAccountLinesQueryParams({ linePage, lineSize, lineTotalElements, linePages }: BnCardStateModel): QueryParams {
        return { page: linePage, size: lineSize, totalElements: lineTotalElements, pages: linePages };
    }

    @Selector()
    static getAccountLinesFilters({ lineFilter }: BnCardStateModel): FilterRequestModel | null {
        return lineFilter;
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

    @Action(BnCardActions.ResetQueryParams)
    resetQueryParams({ patchState }: StateContext<BnCardStateModel>) {
        patchState({
            page: 0,
            size: 10,
            totalElements: 0,
            pages: 0,
            filter: null
        });
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

    @Action(BnCardActions.AccountLineList)
    getAccountLines({ patchState }: StateContext<BnCardStateModel>, action: BnCardActions.AccountLineList) {
        patchState({ lineLoading: true });
        return this._bnCardService.getAccountLines(action.payload.id, action.payload.size, action.payload.page, action.payload.filter ?? {}, action.payload.term ?? '03').pipe(
            tap(data => {
                patchState({
                    accountLines: data.data.items,
                    linePage: data.data.index,
                    lineSize: data.data.size,
                    lineTotalElements: data.data.count,
                    linePages: data.data.pages,
                    lineLoading: false
                });
            })
        );
    }
}