import { useNavigate } from "react-router-dom";

const Cliente = ({cliente, handleDelete}) => {

    const navigate= useNavigate();

    const{nombre, empresa, email, tel, notas, id}=cliente

    return ( 
        <tr className="border-b hover:bg-gray-200">
            <td className="p-3">{nombre}</td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Telefono:</span>{tel}</p>
                <p><span className="text-gray-800 uppercase font-bold">E-mail:</span>{email}</p>
            </td>
            <td className="p-3">
                <button className="rounded-md bg-yellow-400 hover:bg-yellow-600
                                   block w-full text-white p-2 uppercase font-bold text-xs" 
                                   type="button"
                                   onClick={()=> navigate(`/clientes/${id}`)}>Ver</button>

                <button className="rounded-md bg-blue-500 hover:bg-blue-700 mt-3
                                   block w-full text-white p-2 uppercase font-bold text-xs" 
                                   type="button"
                                   onClick={()=> navigate(`/clientes/editar/${id}`)}>Editar</button>

                <button className="rounded-md bg-red-500 hover:bg-red-700 mt-3
                                   block w-full text-white p-2 uppercase font-bold text-xs" 
                                   type="button"
                                   onClick={()=> handleDelete(id)}>Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Cliente ;