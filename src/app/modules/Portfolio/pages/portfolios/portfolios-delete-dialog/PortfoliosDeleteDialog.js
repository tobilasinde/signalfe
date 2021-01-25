import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/portfolios/portfoliosActions";
import { usePortfoliosUIContext } from "../PortfoliosUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PortfoliosDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.portfolios.actionsLoading }),
    shallowEqual
  );

  // if portfolios weren't selected we should close modal
  useEffect(() => {
    if (!portfoliosUIProps.ids || portfoliosUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfoliosUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePortfolios = () => {
    // server request for deleting portfolio by selected ids
    dispatch(actions.deletePortfolios(portfoliosUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPortfolios(portfoliosUIProps.queryParams)).then(
        () => {
          // clear selections list
          portfoliosUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Portfolios Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected portfolios?</span>
        )}
        {isLoading && <span>Portfolio are deleting...</span>}
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
            onClick={deletePortfolios}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
