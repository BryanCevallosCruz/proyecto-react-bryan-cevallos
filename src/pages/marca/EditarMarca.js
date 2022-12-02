import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


export function EditarMarca() {

    const [marca, setMarca] = useState({});
    const [loading, setLoading] = useState(true);
    const { marcaId } = useParams();

    const navegacion = useNavigate();

    useEffect(() => {
        clientHttp.get(`/Marca/${marcaId}`)
            .then((response) => {
                setMarca(response.data);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setMarca((marcaCurrent) => ({ ...marcaCurrent, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.put(`/Marca/?id=${marcaId}`, marca)
                .then(() => {
                    navegacion(`/marca`);
                });
        }
    };

    const { id, nombre } = marca;

    return loading ? <div>Loading data...</div> :
        <><div>Editar Marca</div><br></br>
            <form className="row" onSubmit={(e) => handleSubmit(e)}>
                <div className="col col-md-auto">
                    Código: <b>{id}</b>
                </div>
                <div className="col col-md-auto">
                    <label htmlFor="nombre" className="form-label">Nombre de la marca:</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="nombre"
                            value={nombre} onChange={e => handleChange(e)} required maxLength="80" />
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <button className="btn btn-secondary" type="button"
                        onClick={(e) => navegacion(`/marca`)}>Cancelar</button>
                    <button className="btn btn-primary ms-3" type="submit">Guardar</button>
                </div>
            </form>
        </>;
}
