import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PortfoliosFilter } from "./portfolios-filter/PortfoliosFilter";
import { PortfoliosTable } from "./portfolios-table/PortfoliosTable";
import { PortfoliosGrouping } from "./portfolios-grouping/PortfoliosGrouping";
import { usePortfoliosUIContext } from "./PortfoliosUIContext";

export function PortfoliosCard() {
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      ids: portfoliosUIContext.ids,
      newPortfolioButtonClick: portfoliosUIContext.newPortfolioButtonClick,
    };
  }, [portfoliosUIContext]);

  return (
    <Card>
      <CardHeader title="Portfolios list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={portfoliosUIProps.newPortfolioButtonClick}
          >
            New Upload
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PortfoliosFilter />
        {portfoliosUIProps.ids.length > 0 && <PortfoliosGrouping />}
        <PortfoliosTable />
      </CardBody>
    </Card>
  );
}
