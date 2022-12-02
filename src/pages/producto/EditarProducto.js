import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


function EditarProducto() {

    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);
    const [marca, setMarca] = useState([]);
    const [tipoProducto, setTipoProducto] = useState([]);
    const { productoId } = useParams();

    const navegacion = useNavigate();
    useEffect(() => {
        clientHttp.get(`/Producto/${productoId}`)
            .then((response) => {
                setProducto(response.data);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        clientHttp.get(`/Marca`)
            .then((response) => {
                setMarca(response.data);
            });
    }, []);

    useEffect(() => {
        clientHttp.get(`/TipoProducto`)
            .then((response) => {
                setTipoProducto(response.data);
            });
    }, []);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.id;
        setProducto((productoCurrent) => ({ ...productoCurrent, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.put(`/Producto/?id=${productoId}`, producto)
                .then(() => {
                    navegacion(`/producto`);
                });
        }
    };

    const { id, nombre, precio, observaciones, caducidad, marcaId, tipoProductoId } = producto;

    return loading ? <div>Loading data...</div> :
        <><div>Editar Producto: <b>{id}</b></div>
            <br></br>
            <form className="row" onSubmit={(e) => handleSubmit(e)}>
                <div className="col-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="nombre"
                            value={nombre} onChange={e => handleChange(e)} required maxLength="80" />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="marcaId" className="form-label">Marca</label>
                    <select className="form-select" id="marcaId" value={marcaId} required
                        onChange={e => handleChange(e)}>
                        <option disabled value="">Seleccionar Marca</option>
                        {marca.map((mar) => <option key={mar.id} value={mar.id}>{mar.nombre}</option>)}
                    </select>
                </div>

                <div className="col-6">
                    <label htmlFor="tipoProductoId" className="form-label">Tipo de Producto</label>
                    <select className="form-select" id="tipoProductoId" value={tipoProductoId} required
                        onChange={e => handleChange(e)}>
                        <option disabled value="">Seleccionar Tipo de Producto</option>
                        {tipoProducto.map((tip) => <option key={tip.id} value={tip.id}>{tip.nombre}</option>)}
                    </select>
                </div>

                <div className="col-6">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <div className="input-group has-validation">
                        <input type="number" className="form-control" id="precio"
                            value={precio} required onChange={e => handleChange(e)} />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="observaciones" className="form-label">Observaciones</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="observaciones"
                            value={observaciones} onChange={e => handleChange(e)} />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="caducidad" className="form-label">Caducidad</label>
                    <div className="input-group has-validation">
                        <input type="datetime-local" className="form-control" id="caducidad"
                            value={caducidad} onChange={e => handleChange(e)} />
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <button className="btn btn-secondary" type="button"
                        onClick={(e) => navegacion(`/producto`)}>Cancelar</button>
                    <button className="btn btn-primary ms-3" type="submit">Guardar</button>
                </div>
            </form>
        </>;
}
export default EditarProducto;