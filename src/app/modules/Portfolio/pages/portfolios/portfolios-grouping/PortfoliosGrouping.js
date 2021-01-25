import React, { useMemo } from "react";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";

export function PortfoliosGrouping() {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      ids: portfoliosUIContext.ids,
      setIds: portfoliosUIContext.setIds,
      openDeletePortfoliosDialog: portfoliosUIContext.openDeletePortfoliosDialog,
      openFetchPortfoliosDialog: portfoliosUIContext.openFetchPortfoliosDialog,
      openUpdatePortfoliosStatusDialog:
        portfoliosUIContext.openUpdatePortfoliosStatusDialog,
    };
  }, [portfoliosUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{portfoliosUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={portfoliosUIProps.openDeletePortfoliosDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={portfoliosUIProps.openFetchPortfoliosDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={portfoliosUIProps.openUpdatePortfoliosStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
