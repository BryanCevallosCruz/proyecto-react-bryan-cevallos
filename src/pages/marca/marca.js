import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


function MarcaLista() {

    const [marca, setMarca] = useState([]);
    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/Marca`)
            .then((response) => {
                setMarca(response.data);
            });
    }, []);

    const handlerEditar = (marca) => {
        navegacion(`/marca/${marca.id}`)
    }

    const handlerEliminar = (marca) => {
        navegacion(`/marca/eliminar/${marca.id}`)
    }

    const handlerCrear = () => {
        navegacion(`/marca/crear`)
    }
    return <>
        <div className="row">
            <div className="col col-md-auto">
                <h5>Administración de Marca</h5>
            </div>
            <div className="col col-md-auto">
                <button className="btn btn-primary ms-3" type="button"
                    onClick={() => handlerCrear()}>Crear Marca</button>
            </div>
        </div>
        <br></br>
        <table className="table">
            <thead>
                <tr>
                    <th >Código</th>
                    <th >Marca</th>
                    <th >Acciones</th>
                </tr>
            </thead>
            <tbody>
                {marca.map((tip) =>
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

export default MarcaLista;
