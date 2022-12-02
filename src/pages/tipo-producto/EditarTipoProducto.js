import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


export function EditarTipoProducto() {

    const [tipo, setTipo] = useState({});
    const [loading, setLoading] = useState(true);
    const { tipoId } = useParams();

    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/TipoProducto/${tipoId}`)
            .then((response) => {
                setTipo(response.data);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setTipo((tipoCurrent) => ({ ...tipoCurrent, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.put(`/TipoProducto/?id=${tipoId}`, tipo)
                .then(() => {
                    navegacion(`/tipo-producto`);
                });
        }
    };

    const { id, nombre } = tipo;

    return loading ? <div>Loading data...</div> :
        <><div>Editar Tipo de Producto</div><br></br>
            <form className="row" onSubmit={(e) => handleSubmit(e)}>
                <div className="col col-md-auto">
                    Código: <b>{id}</b>
                </div>
                <div className="col col-md-auto">
                    <label htmlFor="nombre" className="form-label">Nombre del tipo de producto:</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="nombre"
                            value={nombre} onChange={e => handleChange(e)} required maxLength="80" />
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <button className="btn btn-secondary" type="button" onClick={(e) => navegacion(`/tipo-producto`)}>Cancelar</button>
                    <button className="btn btn-primary ms-3" type="submit">Guardar</button>
                </div>
            </form>
        </>;
}
