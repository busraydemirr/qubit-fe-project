import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ClCardStateModel } from "../../models/clcard-state.model";
import { Injectable } from "@angular/core";
import { ClCardActions } from "./clcard.action";
import { ClCardService } from "../../services/clcard.service";
import { tap } from "rxjs";
import { ClCardItemModel } from "../../models/clcard/clcard.model";

@State<ClCardStateModel>({
    name: 'clcard',
    defaults: {
        items: []
    }
})
@Injectable()
export class ClCardState {
    constructor(private _clCardService: ClCardService) { }

    @Selector()
    static getClCards({ items }: ClCardStateModel): ClCardItemModel[] {
        return items;
    }

    @Action(ClCardActions.List)
    listClCards({ patchState }: StateContext<ClCardStateModel>, action: ClCardActions.List) {
        return this._clCardService.listClCards(action.payload.size, action.payload.page, action.payload.filter ?? {}).pipe(
            tap(data => { patchState({ items: data.data.items }) })
        )
    }
}