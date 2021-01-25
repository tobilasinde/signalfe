import axios from "axios";

export const PORTFOLIOS_URL = process.env.REACT_APP_API_URL+'/media';

// CREATE =>  POST: add a new portfolio to the server
export function createPortfolio(portfolio) {
  return axios.post(PORTFOLIOS_URL, portfolio);
}

// READ
export function getAllPortfolios() {
  return axios.get(PORTFOLIOS_URL);
}

export function getPortfolioById(portfolioId) {
  return axios.get(`${PORTFOLIOS_URL}/${portfolioId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPortfolios() {
  return axios.get(`${PORTFOLIOS_URL}/?personal=true`);
}

// UPDATE => PUT: update the portfolio on the server
export function updatePortfolio(portfolio) {
  return axios.put(`${PORTFOLIOS_URL}/${portfolio.id}`, { portfolio });
}

// UPDATE Status
export function updateStatusForPortfolios(ids, status) {
  return axios.post(`${PORTFOLIOS_URL}/updateStatusForPortfolios`, {
    ids,
    status
  });
}

// DELETE => delete the portfolio from the server
export function deletePortfolio(portfolioId) {
  return axios.delete(`${PORTFOLIOS_URL}/${portfolioId}`);
}

// DELETE Portfolios by ids
export function deletePortfolios(ids) {
  return axios.post(`${PORTFOLIOS_URL}/deletePortfolios`, { ids });
}
