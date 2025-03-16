import { Action, State, StateContext } from "@ngxs/store";
import { ClCardStateModel } from "../../models/clcard-state.model";
import { Injectable } from "@angular/core";
import { ClCardActions } from "./clcard.action";
import { ClCardService } from "../../services/clcard.service";
import { tap } from "rxjs";

@State<ClCardStateModel>({
    name: 'clcard',
    defaults: {
        feed: false
    }
})
@Injectable()
export class ClCardState {

    constructor(private _clCardService: ClCardService) { }

    @Action(ClCardActions.List)
    listClCards({ patchState, dispatch }: StateContext<ClCardStateModel>, action: ClCardActions.List) {
        return this._clCardService.listClCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => { console.log(data); })
        )
    }
}