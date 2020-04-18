/** @format */

import React, { Component, Fragment } from "react";
import "./main.scss";
import Moment from "moment";

export default class Main extends Component {
    editBarang = (index) => {
        const nama = prompt('Ubah nama barang', this.props.data[index].nama)
        const deskripsi = prompt('Ubah deskripsi', this.props.data[index].deskripsi)
        const gambar = prompt('Ubah URL gambar', this.props.data[index].gambar)

        const update = {
            nama,
            deskripsi,
            gambar,
            createdAt: Moment().format("MMMM Do YYYY, h:mm:ss a"),
        }

        const list = JSON.parse(localStorage.getItem("shopingList"));

        list.splice(index, 1, update);

        localStorage.setItem("shopingList", JSON.stringify(list));
        window.location.reload();
    }

    deleteBarang = (index) => {
        const list = JSON.parse(localStorage.getItem("shopingList"));

        list.splice(index, 1);

        localStorage.setItem("shopingList", JSON.stringify(list));
        window.location.reload();
    };
    
    render() {
        return (
            <Fragment>
                <div className="container-fluid main p-3">
                    <div className="container">
                        {Array.isArray(this.props.data) &&
                            this.props.data.map((element, index) => {
                                return (
                                    <div
                                        className="row list my-1 py-2"
                                        key={index}
                                    >
                                        <div className="col-sm-2 mb-2">
                                            <img
                                                src={element.gambar}
                                                alt="img"
                                                className="img-thumbnail"
                                            />
                                        </div>
                                        <div className="col-sm-10">
                                            <p className="nama">
                                                {element.nama}
                                            </p>
                                            <p className="createdAt">
                                                {element.createdAt}
                                            </p>
                                            <p className="deskripsi">
                                                {element.deskripsi}
                                            </p>
                                            <hr />
                                            <button
                                                className="btn btn-warning btn-sm" onClick = {() => {this.editBarang(index)}}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm mx-3"
                                                onClick={() => {
                                                    this.deleteBarang(index);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* <div
                    className="modal fade"
                    id="modal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Modal title
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Fragment>
        );
    }
}
