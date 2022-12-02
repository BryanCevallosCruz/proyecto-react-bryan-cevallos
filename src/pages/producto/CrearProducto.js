import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";


function CrearProducto() {

    const [producto, setProducto] = useState({observaciones:null, caducidad:null, marcaId:"", tipoProductoId:""});
    const [marca, setMarca] = useState([]);
    const [tipoProducto, setTipoProducto] = useState([]);

    const navegacion = useNavigate();
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
            clientHttp.post(`/Producto`, producto)
                .then(() => {
                    navegacion(`/producto`);
                });
        }
    };

    
    return<><div>Crear Nuevo Producto</div><br></br>
            <form className="row" onSubmit={(e) => handleSubmit(e)}>
                <div className="col-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="nombre"
                            onChange={e => handleChange(e)} required maxLength="80" />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="marcaId" className="form-label">Marca</label>
                    <select className="form-select" id="marcaId" value={producto.marcaId} required
                        onChange={e => handleChange(e)}>
                        <option disabled value="">Seleccionar Marca</option>
                        {marca.map((mar) => <option key={mar.id} value={mar.id}>{mar.nombre}</option>)}
                    </select>
                </div>

                <div className="col-6">
                    <label htmlFor="tipoProductoId" className="form-label">Tipo de Producto</label>
                    <select className="form-select" id="tipoProductoId" value={producto.tipoProductoId} required
                        onChange={e => handleChange(e)}>
                        <option disabled value="">Seleccionar Tipo de Producto</option>
                        {tipoProducto.map((tip) => <option key={tip.id} value={tip.id}>{tip.nombre}</option>)}
                    </select>
                </div>

                <div className="col-6">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <div className="input-group has-validation">
                        <input type="number" placeholder="1.0" step="0.01" className="form-control" id="precio"
                         required onChange={e => handleChange(e)} />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="observaciones" className="form-label">Observaciones</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="observaciones"
                           onChange={e => handleChange(e)} />
                    </div>
                </div>

                <div className="col-6">
                    <label htmlFor="caducidad" className="form-label">Caducidad</label>
                    <div className="input-group has-validation">
                        <input type="date" className="form-control" id="caducidad"
                            onChange={e => handleChange(e)} />
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
export default CrearProducto;