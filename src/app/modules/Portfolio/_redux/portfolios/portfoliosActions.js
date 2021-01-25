import * as requestFromServer from "./portfoliosCrud";
import {portfoliosSlice, callTypes} from "./portfoliosSlice";
import MockUtils from "../../../mock.utils";

const {actions} = portfoliosSlice;

export const fetchPortfolios = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPortfolios()
    .then(response => {
      const mockUtils = new MockUtils();
      const filteredPortfolios = mockUtils.baseFilter(response.data.data, queryParams);
      const { totalCount, entities } = filteredPortfolios;
      dispatch(actions.portfoliosFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolios";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPortfolio = id => dispatch => {
  if (!id) {
    return dispatch(actions.portfolioFetched({ portfolioForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPortfolioById(id)
    .then(response => {
      const portfolio = response.data;
      dispatch(actions.portfolioFetched({ portfolioForEdit: portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't find portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePortfolio = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePortfolio(id)
    .then(response => {
      dispatch(actions.portfolioDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPortfolio = portfolioForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPortfolio(portfolioForCreation)
    .then(response => {
      const { data } = response.data;
      dispatch(actions.portfolioCreated({ data }));
    })
    .catch(error => {
      error.clientMessage = "Can't create portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePortfolio = portfolio => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePortfolio(portfolio)
    .then(() => {
      dispatch(actions.portfolioUpdated({ portfolio }));
    })
    .catch(error => {
      error.clientMessage = "Can't update portfolio";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePortfoliosStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPortfolios(ids, status)
    .then(() => {
      dispatch(actions.portfoliosStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update portfolios status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePortfolios = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePortfolios(ids)
    .then(() => {
      dispatch(actions.portfoliosDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete portfolios";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
