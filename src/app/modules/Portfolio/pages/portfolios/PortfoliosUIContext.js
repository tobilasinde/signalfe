import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./PortfoliosUIHelpers";

const PortfoliosUIContext = createContext();

export function usePortfoliosUIContext() {
  return useContext(PortfoliosUIContext);
}

export const PortfoliosUIConsumer = PortfoliosUIContext.Consumer;

export function PortfoliosUIProvider({portfoliosUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initPortfolio = {
    id: undefined,
    category: "",
    tag: "",
    file: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPortfolio,
    newPortfolioButtonClick: portfoliosUIEvents.newPortfolioButtonClick,
    openEditPortfolioDialog: portfoliosUIEvents.openEditPortfolioDialog,
    openDeletePortfolioDialog: portfoliosUIEvents.openDeletePortfolioDialog,
    openDeletePortfoliosDialog: portfoliosUIEvents.openDeletePortfoliosDialog,
    openFetchPortfoliosDialog: portfoliosUIEvents.openFetchPortfoliosDialog,
    openUpdatePortfoliosStatusDialog: portfoliosUIEvents.openUpdatePortfoliosStatusDialog
  };

  return <PortfoliosUIContext.Provider value={value}>{children}</PortfoliosUIContext.Provider>;
}