import React from "react";
import { Route } from "react-router-dom";
import { PortfoliosLoadingDialog } from "./portfolios-loading-dialog/PortfoliosLoadingDialog";
import { PortfolioEditDialog } from "./portfolio-edit-dialog/PortfolioEditDialog";
import { PortfolioDeleteDialog } from "./portfolio-delete-dialog/PortfolioDeleteDialog";
import { PortfoliosDeleteDialog } from "./portfolios-delete-dialog/PortfoliosDeleteDialog";
import { PortfoliosFetchDialog } from "./portfolios-fetch-dialog/PortfoliosFetchDialog";
import { PortfoliosUpdateStateDialog } from "./portfolios-update-status-dialog/PortfoliosUpdateStateDialog";
import { PortfoliosUIProvider } from "./PortfoliosUIContext";
import { PortfoliosCard } from "./PortfoliosCard";

export function PortfoliosPage({ history }) {
  const portfoliosUIEvents = {
    newPortfolioButtonClick: () => {
      history.push("/portfolios/new");
    },
    openEditPortfolioDialog: (id) => {
      history.push(`/portfolios/${id}/edit`);
    },
    openDeletePortfolioDialog: (id) => {
      history.push(`/portfolios/${id}/delete`);
    },
    openDeletePortfoliosDialog: () => {
      history.push(`/portfolios/deletePortfolios`);
    },
    openFetchPortfoliosDialog: () => {
      history.push(`/portfolios/fetch`);
    },
    openUpdatePortfoliosStatusDialog: () => {
      history.push("/portfolios/updateStatus");
    }
  }

  return (
    <PortfoliosUIProvider portfoliosUIEvents={portfoliosUIEvents}>
      <PortfoliosLoadingDialog />
      <Route path="/portfolios/new">
        {({ history, match }) => (
          <PortfolioEditDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolios/:id/edit">
        {({ history, match }) => (
          <PortfolioEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolios/deletePortfolios">
        {({ history, match }) => (
          <PortfoliosDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolios/:id/delete">
        {({ history, match }) => (
          <PortfolioDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolios/fetch">
        {({ history, match }) => (
          <PortfoliosFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <Route path="/portfolios/updateStatus">
        {({ history, match }) => (
          <PortfoliosUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/portfolios");
            }}
          />
        )}
      </Route>
      <PortfoliosCard />
    </PortfoliosUIProvider>
  );
}
