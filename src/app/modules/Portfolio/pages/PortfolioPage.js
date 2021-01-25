import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { PortfoliosPage } from "./portfolios/PortfoliosPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function PortfolioPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/portfolios" component={PortfoliosPage} />
      </Switch>
    </Suspense>
  );
}
