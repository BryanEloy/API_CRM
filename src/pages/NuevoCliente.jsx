import Formulario from "./Formulario";

const NuevoCliente = () => {

    return ( 
        <>
            <h1 className="font-black text-4xl text-blue-600">Nuevo Cliente</h1>
            <h3 className="mt-3">Llena los siguientes campos para agregar un nuevo cliente</h3>

            <Formulario/>
        </>
     );
}
 
export default NuevoCliente;