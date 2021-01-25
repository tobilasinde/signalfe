import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
import {usePortfoliosUIContext} from "../PortfoliosUIContext";

export function PortfolioDeleteDialog({ id, show, onHide }) {
  // Portfolios UI Context
  const portfoliosUIContext = usePortfoliosUIContext();
  const portfoliosUIProps = useMemo(() => {
    return {
      setIds: portfoliosUIContext.setIds,
      queryParams: portfoliosUIContext.queryParams
    };
  }, [portfoliosUIContext]);

  // Portfolios Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.portfolios.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePortfolio = () => {
    // server request for deleting portfolio by id
    dispatch(actions.deletePortfolio(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPortfolios(portfoliosUIProps.queryParams));
      // clear selections list
      portfoliosUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Portfolio Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this portfolio?</span>
        )}
        {isLoading && <span>Portfolio is deleting...</span>}
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
            onClick={deletePortfolio}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
