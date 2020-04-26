/** @format */

import React, { Component, Fragment } from "react";
import "./form.scss";
import Moment from "moment";
import Main from "./Content";

export default class Form extends Component {
    state = {
        nama: "",
        deskripsi: "",
        gambar: "",
        createdAt: Moment().format("MMMM Do YYYY, h:mm:ss a"),
    };

    getData = () => localStorage.getItem("shopingList");

    handleChange = (event) => {
        const eventValue = event.target.value;
        const eventName = event.target.name;

        this.setState((prevState) => ({
            [eventName]: eventValue,
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const dataBarang = {
            nama: this.state.nama,
            deskripsi: this.state.deskripsi,
            gambar: this.state.gambar,
            createdAt: this.state.createdAt,
        };
        const list = this.getData()

        const data = list === null ? [] : JSON.parse(list);

        data.push(dataBarang);

        localStorage.setItem("shopingList", JSON.stringify(data));
        window.location.reload();
    };

    render() {
        const dataBarang = JSON.parse(this.getData());
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row my-5 form py-3">
                            <div className="col-12">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mt-2">
                                            <input
                                                type="text"
                                                name="nama"
                                                className="form-control"
                                                placeholder="Nama barang"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mt-2">
                                            <input
                                                type="text"
                                                name="deskripsi"
                                                className="form-control"
                                                placeholder="Deskripsi"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col 
                                    mt-2"
                                        >
                                            <input
                                                type="url"
                                                name="gambar"
                                                className="form-control"
                                                placeholder="Url gambar"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-block my-2"
                                        type="submit"
                                        onClick={() => {}}
                                    >
                                        Tambah
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Main data={dataBarang} />
            </Fragment>
        );
    }
}
