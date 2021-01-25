import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  PortfolioStatusCssClasses,
  PortfolioStatusTitles,
} from "../PortfoliosUIHelpers";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
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

export function PortfoliosUpdateStateDialog({ show, onHide }) {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      ids: portfoliosUIContext.ids,
      setIds: portfoliosUIContext.setIds,
      queryParams: portfoliosUIContext.queryParams,
    };
  }, [portfoliosUIContext]);

  // Portfolios Redux state
  const { portfolios, isLoading } = useSelector(
    (state) => ({
      portfolios: selectedPortfolios(
        state.portfolios.entities,
        portfoliosUIProps.ids
      ),
      isLoading: state.portfolios.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!portfoliosUIProps.ids || portfoliosUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfoliosUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update portfolios status by selected ids
    dispatch(actions.updatePortfoliosStatus(portfoliosUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchPortfolios(portfoliosUIProps.queryParams)).then(
          () => {
            // clear selections list
            portfoliosUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected portfolios
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
