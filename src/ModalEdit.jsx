/** @format */

import React from "react";
import "./main.scss";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

function ModalEdit(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        id: props.id,
                        nama: props.id !== "" && props.data[props.id].nama,
                        deskripsi:
                            props.id !== "" && props.data[props.id].deskripsi,
                        gambar: props.id !== "" && props.data[props.id].gambar,
                        createdAt: Moment().format("MMMM Do YYYY, h:mm:ss a"),
                    }}
                    enableReinitialize={true}
                    validate={(values) => {
                        const errors = {};
                        if (values.nama === "") {
                            errors.nama = "Barang tidak boleh kosong";
                        }
                        if (values.deskripsi === "") {
                            errors.deskripsi = "Deskripsi tidak boleh kosong";
                        }
                        if (values.gambar === "") {
                            errors.gambar = "Url gambar tidak boleh kosong";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const list = JSON.parse(
                            localStorage.getItem("shopingList")
                        );

                        list.splice(values.id, 1, values);

                        localStorage.setItem(
                            "shopingList",
                            JSON.stringify(list)
                        );
                        window.location.reload();
                    }}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <Field
                                type="text"
                                name="nama"
                                className="form-control"
                                placeholder="Nama barang"
                                required
                                defaultValue={values.nama}
                            />
                            <ErrorMessage name="nama" component="div" />
                            <Field
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                }}
                                type="text"
                                name="deskripsi"
                                className="form-control"
                                placeholder="Deskripsi"
                                required
                                defaultValue={values.deskripsi}
                            />
                            <ErrorMessage name="deskripsi" component="div" />
                            <Field
                                type="url"
                                name="gambar"
                                className="form-control"
                                placeholder="Url gambar"
                                required
                                defaultValue={values.gambar}
                            />
                            <ErrorMessage name="gambar" component="div" />
                            <Button
                                className="btn btn-primary my-2 "
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Update
                            </Button>
                            <Button
                                className="btn btn-secondary my-2 mx-2 "
                                onClick={props.onHide}
                            >
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalEdit;
