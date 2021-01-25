import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import jsonwebtoken from "jsonwebtoken";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  refreshToken: undefined
};

let token;
export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken", "refreshToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, refreshToken } = action.payload;
        token = authToken;
        return { authToken, refreshToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken, refreshToken } = action.payload;
        token = authToken;
        return { authToken, refreshToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, refreshToken) => ({ type: actionTypes.Login, payload: { authToken, refreshToken } }),
  register: (authToken, refreshToken) => ({
    type: actionTypes.Register,
    payload: { authToken, refreshToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { user } = yield jsonwebtoken.verify(token, process.env.REACT_APP_JSON_WEB_SECRET_KEY);

    yield put(actions.fulfillUser(user));
  });
}
