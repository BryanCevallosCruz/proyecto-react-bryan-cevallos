import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


export function CrearMarca() {

    const [marca, setMarca] = useState({});
    const navegacion = useNavigate();

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setMarca((marcaCurrent) => ({ ...marcaCurrent, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.post(`/Marca`, marca)
                .then(() => {
                    navegacion(`/marca`);
                });
        }
    };

    return <><div>Crear Marca</div><br></br>
        <form className="row" onSubmit={(e) => handleSubmit(e)}>
            <div className="col col-md-auto">
                <label htmlFor="codigo" className="form-label">Código de marca:</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="id"
                        onChange={e => handleChange(e)} required maxLength="12" />
                </div>
            </div>
            <div className="col col-md-auto">
                <label htmlFor="nombre" className="form-label">Nombre de la marca:</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="nombre"
                        onChange={e => handleChange(e)} required maxLength="80" />
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
