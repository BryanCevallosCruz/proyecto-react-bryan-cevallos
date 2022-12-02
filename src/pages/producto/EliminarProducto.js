import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import clientHttp from "../../services/ClientHttp";

function EliminarProducto() {
    const [show, setShow] = useState(true);
    const [producto, setProducto] = useState({});
    const { productoId } = useParams();
    const navegacion = useNavigate();

    const handleClose = () => {
        setShow(false);
        navegacion(`/producto`)
    }

    useEffect(() => {
        clientHttp.get(`/Producto/${productoId}`)
            .then((response) => {
                setProducto(response.data);
            });
    }, []);

    const handleEliminar=()=>{
        setShow(false);
        clientHttp.delete(`/Producto/?marcaId=${producto.id}`)
            .then(() => {
                navegacion(`/producto`)
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Se eliminará el siguiente producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">Id: {producto.id}</div>
                        <div className="col-6">Producto: {producto.nombre}</div>
                        <div className="col-6">Marca: {producto.marca}</div>
                        <div className="col-6">Tipo: {producto.tipoProducto}</div>
                        <div className="col-6">Precio: {producto.precio}</div>
                        <div className="col-6">Observaciones: {producto.observaciones}</div>
                        <div className="col-12">Caducidad: {producto.caducidad}</div>
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

export default EliminarProducto;