import MarcaLista from "../pages/marca/marca";
import { CrearMarca } from "../pages/marca/CrearMarca";
import { EditarMarca } from "../pages/marca/EditarMarca";
import ProductoLista from "../pages/producto/producto";
import EditarProducto from "../pages/producto/EditarProducto";
import CrearProducto from "../pages/producto/CrearProducto";
import TipoProductoLista from "../pages/tipo-producto/tipo-producto";
import { CrearTipoProducto } from "../pages/tipo-producto/CrearTipoProducto";
import { EditarTipoProducto } from "../pages/tipo-producto/EditarTipoProducto";
import EliminarMarca from "../pages/marca/EliminarMarca";
import EliminarTipoProducto from "../pages/tipo-producto/EliminarTipoProducto";
import EliminarProducto from "../pages/producto/EliminarProducto";

export default [
    {
        name: "Producto",
        key: "producto",
        route: "/producto",
        component: <ProductoLista />,
        showLink: true
    },
    {
        name: "Editar Producto ",
        key: "producto-edit",
        route: "/producto/:productoId",
        component: <EditarProducto />,
        showLink: false
    },
    {
        name: "Crear Producto",
        key: "producto-create",
        route: "/producto/crear",
        component: <CrearProducto />,
        showLink: false
    },
    {
        name: "Eliminar Producto",
        key: "producto-delete",
        route: "/producto/eliminar/:productoId",
        component: <EliminarProducto />,
        showLink: false
    },
    {
        name: "Marca",
        key: "marca",
        route: "/marca",
        component: <MarcaLista />,
        showLink: true
    },
    {
        name: "Editar Marca ",
        key: "marca-edit",
        route: "/marca/:marcaId",
        component: <EditarMarca />,
        showLink: false
    },
    {
        name: "Crear Marca",
        key: "marca-create",
        route: "/marca/crear",
        component: <CrearMarca />,
        showLink: false
    },
    {
        name: "Eliminar Marca",
        key: "marca-delete",
        route: "/marca/eliminar/:marcaId",
        component: <EliminarMarca />,
        showLink: false
    },
    {
        name: "Tipo de Producto",
        key: "tipo-productos",
        route: "/tipo-producto",
        component: <TipoProductoLista />,
        showLink: true
    },
    {
        name: "Editar Tipo Producto ",
        key: "tipo-productos-edit",
        route: "/tipo-producto/:tipoId",
        component: <EditarTipoProducto />,
        showLink: false
    },
    {
        name: "Crear Tipo Producto ",
        key: "tipo-productos-create",
        route: "/tipo-producto/crear",
        component: <CrearTipoProducto />,
        showLink: false
    },
    {
        name: "Eliminar Tipo Producto",
        key: "tipo-productos-delete",
        route: "/tipo-producto/eliminar/:tipoId",
        component: <EliminarTipoProducto />,
        showLink: false
    }
];