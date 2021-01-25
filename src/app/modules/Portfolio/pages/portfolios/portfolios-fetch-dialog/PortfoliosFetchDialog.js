import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  PortfolioStatusCssClasses,
  PortfolioStatusTitles,
} from "../PortfoliosUIHelpers";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";

const selectedPortfolios = (entities, ids) => {
  const _portfolios = [];
  ids.forEach((id) => {
    const portfolio = entities.find((el) => el.id === id);
    if (portfolio) {
      _portfolios.push(portfolio);
    }
  });
  return _portfolios;
};

export function PortfoliosFetchDialog({ show, onHide }) {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      ids: portfoliosUIContext.ids,
    };
  }, [portfoliosUIContext]);

  // Portfolios Redux state
  const { portfolios } = useSelector(
    (state) => ({
      portfolios: selectedPortfolios(
        state.portfolios.entities,
        portfoliosUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if portfolios weren't selected we should close modal
  useEffect(() => {
    if (!portfoliosUIProps.ids || portfoliosUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfoliosUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) => (
              <tr key={`id${portfolio.id}`}>
                <td>{portfolio.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PortfolioStatusCssClasses[portfolio.status]
                    } label-inline`}
                  >
                    {" "}
                    {PortfolioStatusTitles[portfolio.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {portfolio.lastName}, {portfolio.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
