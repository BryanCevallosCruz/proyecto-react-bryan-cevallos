import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";

function TipoProductoLista() {

    const [tipo, setTipo] = useState([]);
    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/TipoProducto`)
            .then((response) => {
                setTipo(response.data);
            });
    }, []);

    const handlerEditar = (tipo) => {
        navegacion(`/tipo-producto/${tipo.id}`)
    }

    const handlerEliminar = (tipo) => {
        navegacion(`/tipo-producto/eliminar/${tipo.id}`)
        // navegacion(`/`)
        // clientHttp.delete(`/TipoProducto/?marcaId=${tipo.id}`)
        //     .then(() => {
        //         navegacion(`/tipo-producto`)
        //     });
    }

    const handlerCrear = () => {
        navegacion(`/tipo-producto/crear`)
    }
    return <>
        <div className="row">
            <div className="col col-md-auto">
                <h5>Administración de Tipo de Producto</h5>
            </div>
            <div className="col col-md-auto">
                <button className="btn btn-primary ms-3" type="button"
                    onClick={() => handlerCrear()}>Crear Tipo de Producto</button>
            </div>
        </div>
        <br></br>
        <table className="table">
            <thead>
                <tr>
                    <th >Código</th>
                    <th >Tipo de Producto</th>
                    <th >Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipo.map((tip) =>
                    <tr key={tip.id}>
                        <td>{tip.id}</td>
                        <td>{tip.nombre}</td>
                        <td>
                            <button className="btn btn-success btn-sm" type="button"
                                onClick={(e) => handlerEditar(tip)}>Editar</button>
                            <button className="btn btn-danger btn-sm" type="button"
                                onClick={(e) => handlerEliminar(tip)}>Eliminar</button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </>
}

export default TipoProductoLista;
