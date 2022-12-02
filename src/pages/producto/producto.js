import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
function ProductoLista() {

    const [producto, setProducto] = useState([]);
    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/Producto`)
            .then((response) => {
                setProducto(response.data.lista);
            });
    }, []);

    const handlerEditar = (producto) => {
        navegacion(`/producto/${producto.id}`)
    }

    const handlerEliminar = (producto) => {
        navegacion(`/producto/eliminar/${producto.id}`)
    }

    const handlerCrear = () => {
        navegacion(`/producto/crear`)
    }
    return <>
        <div className="row">
            <div className="col col-md-auto">
                <h5>Administración de Productos</h5>
            </div>
            <div className="col col-md-auto">
                <button className="btn btn-primary ms-3" type="button" onClick={() => handlerCrear()}>Crear Producto</button>
            </div>
        </div>
        <br></br>
        <div className="row">
            <table className="table">
                <thead>
                    <tr>
                        <th >Código</th>
                        <th >Producto</th>
                        <th >Marca</th>
                        <th >Tipo</th>
                        <th >Precio</th>
                        <th >Observaciones</th>
                        <th >Caducidad</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {producto.map((prod) =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.nombre}</td>
                            <td>{prod.marca}</td>
                            <td>{prod.tipoProducto}</td>
                            <td>{prod.precio}</td>
                            <td>{prod.observaciones}</td>
                            <td>{prod.caducidad}</td>
                            <td>
                                <button className="btn btn-success btn-sm" type="button"
                                    onClick={(e) => handlerEditar(prod)}>Editar</button>
                                <button className="btn btn-danger btn-sm" type="button"
                                    onClick={(e) => handlerEliminar(prod)}>Eliminar</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </>
}

export default ProductoLista;
