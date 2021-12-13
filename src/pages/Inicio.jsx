import { useEffect, useState } from "react";
import Cliente from "./Cliente";


const Inicio = () => {

    const [clientes, setClientes]= useState([])

     useEffect(()=>{
        const obtenerClientes= async()=>{
            try {
                const url= 'http://localhost:4000/clientes'
                const resp= await fetch(url);
                const datos= await resp.json();
                setClientes(datos)
                
            } catch (error) {
                console.log(error)
            }
        }
        obtenerClientes();
     },[]);

     const handleDelete= async id=>{
        const confirmar= confirm('Desea eliminar este cliente??');

        if(confirmar){
            try {
                const url= `http://localhost:4000/clientes/${id}`
                const resp= await fetch(url,{
                    method: 'DELETE'
                })
                await resp.json();
                const clientesNew= clientes.filter( cliente => cliente.id !== id);
                setClientes(clientesNew);
            } catch (error) {
                console.log(error)
            }
        }
     }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-600">Clientes</h1>
            <h3 className="mt-3">Administra tus clientes</h3>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map( cliente =>(
                        <Cliente
                        key={cliente.id}
                        cliente={cliente}
                        handleDelete={handleDelete}/>
                    ))}
                </tbody>
            </table>
        </>
    )
}
 
export default Inicio;