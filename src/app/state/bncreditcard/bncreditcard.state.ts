import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCreditCardStateModel } from "../../models/bncreditcard-state.model";
import { BnCreditCardService } from "../../services/bn-credit-card.service";
import { BnCreditCardActions } from "./bncreditcard.action";
import { BnCreditCardItemModel } from "../../models/bncreditcard/bncreditcard.model";

@State<BnCreditCardStateModel>({
    name: 'bncreditcard',
    defaults: {
        items: []
    }
})
@Injectable()
export class BnCreditCardState {
    constructor(private _bnCreditCardService: BnCreditCardService) { }

    @Selector()
    static getBnCreditCards({ items }: BnCreditCardStateModel): BnCreditCardItemModel[] {
        return items;
    }

    @Action(BnCreditCardActions.List)
    listBnCreditCards({ patchState }: StateContext<BnCreditCardStateModel>, action: BnCreditCardActions.List) {
        return this._bnCreditCardService.listBnCreditCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => { patchState({ items: data.data.items }); })
        )
    }
}