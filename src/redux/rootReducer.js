import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {portfoliosSlice} from "../app/modules/Portfolio/_redux/portfolios/portfoliosSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  portfolios: portfoliosSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
