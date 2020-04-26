/** @format */

import React from "react";
import "./main.scss";
import ModalEdit from "./ModalEdit";

function Content(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [id, setId] = React.useState("");

    const showModal = (index) => {
        setModalShow(true);
        setId(index);
    };

    const deleteBarang = (index) => {
        const list = JSON.parse(localStorage.getItem("shopingList"));

        list.splice(index, 1);

        localStorage.setItem("shopingList", JSON.stringify(list));
        window.location.reload();
    };

    return (
        <div className="container-fluid main p-3">
            <div className="container">
                {Array.isArray(props.data) && props.data.length > 0 ? (
                    props.data.map((element, index) => {
                        return (
                            <div className="row list my-1 py-2" key={index}>
                                <div className="col-sm-2 mb-2">
                                    <img
                                        src={element.gambar}
                                        alt="img"
                                        className="img-thumbnail"
                                    />
                                </div>
                                <div className="col-sm-10">
                                    <p className="nama">{element.nama}</p>
                                    <p className="createdAt">
                                        {element.createdAt}
                                    </p>
                                    <p className="deskripsi">
                                        {element.deskripsi}
                                    </p>
                                    <hr />
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => {
                                            showModal(index);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm mx-3"
                                        onClick={() => {
                                            deleteBarang(index);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="alert">Tidak ada shopping list</p>
                )}
                <ModalEdit
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={id}
                    data={props.data}
                />
            </div>
        </div>
    );
}

export default Content;
