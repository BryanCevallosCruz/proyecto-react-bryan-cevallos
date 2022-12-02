import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import clientHttp from "../../services/ClientHttp";

function EliminarTipoProducto() {
    const [show, setShow] = useState(true);
    const [tipo, setTipo] = useState({});
    const { tipoId } = useParams();
    const navegacion = useNavigate();

    const handleClose = () => {
        setShow(false);
        navegacion(`/tipo-producto`)
    }

    useEffect(() => {
        clientHttp.get(`/TipoProducto/${tipoId}`)
            .then((response) => {
                setTipo(response.data);
            });
    }, []);

    const handleEliminar=()=>{
        setShow(false);
        clientHttp.delete(`/TipoProducto/?marcaId=${tipo.id}`)
            .then(() => {
                navegacion(`/tipo-producto`)
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Se eliminará el siguiente tipo de producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            Código: {tipo.id}
                        </div>
                        <div className="col-6">
                            Tipo de Producto: {tipo.nombre}
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

export default EliminarTipoProducto;