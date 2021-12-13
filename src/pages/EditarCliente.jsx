import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Formulario from './Formulario';

const EditarCliente = () => {

    const {id}= useParams();
    const[cliente, setCliente]= useState({})
    const [cargando, setCargando]= useState(true);

    useEffect(()=>{
        const obtenerCliente = async ()=>{
            try {
                const resp= await fetch(`http://localhost:4000/clientes/${id}`);
                const info= await resp.json();
                setCliente(info)
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setCargando(false);
            }, 1200);
        }
        obtenerCliente();
    },[])

    return ( 
        <>
            <h1 className="font-black text-4xl text-blue-600">Editar Cliente Cliente</h1>
            <h3 className="mt-3">Modifica los datos del cliente</h3>

            {cliente.nombre ? <Formulario cliente={cliente} cargando={cargando}/> 
                            : <p>No se encontraron datos</p>}
        </>
     );
}
 
export default EditarCliente;