import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCardActions } from "./bncard.action";
import { BnCardStateModel } from "../../models/bncard-state.model";
import { BnCardService } from "../../services/bncard.service";
import { BnCardItemModel } from "../../models/bncard/bncard.model";

@State<BnCardStateModel>({
    name: 'bncard',
    defaults: {
        items: []
    }
})
@Injectable()
export class BnCardState {
    constructor(private _bnCardService: BnCardService) { }

    @Selector()
    static getBnCards({ items }: BnCardStateModel): BnCardItemModel[] {
        return items;
    }

    @Action(BnCardActions.List)
    listBnCards({ patchState }: StateContext<BnCardStateModel>, action: BnCardActions.List) {
        return this._bnCardService.listBnCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => { patchState({items: data.data.items}) })
        )
    }
}