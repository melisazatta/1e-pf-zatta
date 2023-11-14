import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, reducer as authReducer, State as authState } from "./auth/auth.reducer";

export interface AppState {
    [authFeatureKey]: authState
}

export const appReducer: ActionReducerMap<AppState> = {
    [authFeatureKey]: authReducer

}