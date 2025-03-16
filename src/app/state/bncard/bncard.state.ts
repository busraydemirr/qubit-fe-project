import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { BnCardActions } from "./bncard.action";
import { BnCardStateModel } from "../../models/bncard-state.model";
import { BnCardService } from "../../services/bncard.service";

@State<BnCardStateModel>({
    name: 'bncard',
    defaults: {}
})
@Injectable()
export class BnCardState {

    constructor(private _bnCardService: BnCardService) { }

    @Action(BnCardActions.List)
    listBnCards({ patchState, dispatch }: StateContext<BnCardStateModel>, action: BnCardActions.List) {
        return this._bnCardService.listBnCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => { console.log(data); })
        )
    }
}