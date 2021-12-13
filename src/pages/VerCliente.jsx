 import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

import Spinner from '../pages/Spinner'
 

 const VerCliente = () => {

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
         
            <div>
                {cargando   ?<Spinner/> 
                            :Object.keys(cliente).length ===0 ? <p>No hay resultados para el id buscado</p> :( 
                    <>
                        <h1 className="font-black text-4xl text-blue-600">Ver cliente: {cliente.nombre}</h1>
                        <h3 className="mt-3 mb-10">Informacion del cliente</h3>

                        <p className="text-2xl text-gray-600">
                            <span className="text-gray-800 uppercase font-bold">Nombre: </span>
                        {cliente.nombre}</p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">E-mail: </span>
                        {cliente.email}</p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Telefono: </span>
                        {cliente.tel}</p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                        {cliente.empresa}</p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Notas: </span>
                        {cliente.notas}</p>
                    </> 
                )}
            </div> 
     );
 }
  
 export default VerCliente;