import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import clientHttp from "../../services/ClientHttp";

function EliminarMarca() {
    const [show, setShow] = useState(true);
    const [marca, setMarca] = useState({});
    const { marcaId } = useParams();
    const navegacion = useNavigate();

    const handleClose = () => {
        setShow(false);
        navegacion(`/marca`)
    }

    useEffect(() => {
        clientHttp.get(`/Marca/${marcaId}`)
            .then((response) => {
                setMarca(response.data);
            });
    }, []);

    const handleEliminar=()=>{
        setShow(false);
        clientHttp.delete(`/Marca/?marcaId=${marca.id}`)
            .then(() => {
                navegacion(`/marca`)
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Se eliminará la siguiente marca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            Código: {marca.id}
                        </div>
                        <div className="col-6">
                            Marca: {marca.nombre}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEliminar}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EliminarMarca;