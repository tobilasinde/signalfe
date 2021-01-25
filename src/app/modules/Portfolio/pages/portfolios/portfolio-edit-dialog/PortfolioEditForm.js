// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import request from 'superagent';
import {
  Input,
  Select
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const PortfolioEditSchema = Yup.object().shape({
  category: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  tag: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required")
});

export function PortfolioEditForm({
  savePortfolio,
  portfolio,
  actionsLoading,
  onHide,
}) {
  //0 = default, 1 = loading, 2 = success, 3 = error
  const [loading, setLoading] = useState(0);
  const [public_id, setPublic_id] = useState();
  function onPhotoSelected(files) {
    const url = `https://api.cloudinary.com/v1_1/${
        process.env.REACT_APP_CLOUD_NAME
        }/upload`;
    const title = "this.titleEl.value";
  
    for (let file of files) {
        const fileName = file.name;
        console.log(fileName)
        request.post(url)
            .field('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
            .field('file', file)
            .field('multiple', true)
            .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
            .field('context', title ? `photo=${title}` : '')
            .on('progress', (progress) => setLoading(1))
            .end((error, response) => {
              setPublic_id(response.body.public_id)
              if(error !== null) setLoading(3)
              else setLoading(2)
            });
    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={portfolio}
        validationSchema={PortfolioEditSchema}
        onSubmit={(values) => {
          savePortfolio({...values, public_id: public_id});
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-6">
                    <Select name="category" label="Category">
                      <option >--Select One--</option>
                      <option value="Business">Business</option>
                      <option value="Individual">Individual</option>
                    </Select>
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-6">
                    <Field
                      name="tag"
                      component={Input}
                      placeholder="Tag"
                      label="Tag"
                    />
                  </div>
                </div>
                {loading === 0 ? (
                <div className="form-group row">
                  <div className="col-lg-6">
                    <input type="file" name="file" onChange={(e) =>
                          onPhotoSelected(
                              e.target.files
                          )
                      } />
                  </div>
                </div>) : loading === 1 ? <div className="spinner spinner-primary mr-15"></div> : loading === 3 ? (
                <div className="form-group row">
                  <div className="col-lg-6">
                    <input type="file" name="file" onChange={(e) =>
                          onPhotoSelected(
                              e.target.files
                          )
                      } />
                  </div><div style={{color: "red"}}>Error while uploading!!!</div>
                </div>) : <div style={{color: "green"}}>Image uploaded successfully!!! </div>}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                disabled={loading !== 2}
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
