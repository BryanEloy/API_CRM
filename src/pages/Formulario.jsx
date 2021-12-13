import { Formik, Form, Field, } from "formik";
import { useState } from "react";
import * as Yup from 'yup'
import Alert from "./Alert";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Formulario = ({cliente, cargando}) => {
    
    const navigate= useNavigate();
    const [exito, setExito]= useState(false);

    const nuevoClienteSchema= Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').required('El nombre es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().required('El E-mail de la empresa es obligatorio'),
        tel: Yup.number().integer('Numero no valido').positive('Numero no valido')
    })

    const handleSubmit= async (values)=>{
        try {
            if(cliente.id){
                //Editar Cliente
                const url= `http://localhost:4000/clientes/${cliente.id}`
                const resp= await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                //Nuevo cliente
                const url= 'http://localhost:4000/clientes'
                const resp= await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                
            }
            await resp.json();
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        cargando ?<Spinner/> :(
            <div className="bg-white mt-10 rounded-md shadow-md md:w-3/4 mx-auto p-6">
                <h2 className="text-gray-600 font-bold texte-xl uppercase text-center">
                    {cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                </h2>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        tel: cliente?.tel ?? '',
                        notas: cliente?.notas ?? ''
                    }} 
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm})=>{
                        await handleSubmit(values)
                        setExito(true);
                        setTimeout(() => {
                            resetForm();  
                            setExito(false); 
                            navigate('/clientes');                         
                        },1000);
                        
                    }}   
                    validationSchema={nuevoClienteSchema}
                >

                    {({errors, touched})=>(

                    <Form className="mt-10">
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="nombre">Nombre: </label>
                            <Field id="nombre" type="text" className="mt-2 block w-full p-3 bg-gray-200"
                                     placeholder="Cliente nuevo" name="nombre"/>
                            {errors.nombre && touched.nombre    ? <Alert error={true}>{errors.nombre}</Alert>
                                                                :null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="empresa">Empresa: </label>
                            <Field id="empresa" type="text" className="mt-2 block w-full p-3 bg-gray-200"
                                     placeholder="Empresa del cliente" name="empresa"/>
                            {errors.empresa && touched.empresa    ? <Alert error={true}>{errors.empresa}</Alert>
                                                                :null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="email">E-mail: </label>
                            <Field id="email" type="email" className="mt-2 block w-full p-3 bg-gray-200"
                                     placeholder="Email del cliente" name="email"/>
                            {errors.email && touched.email    ? <Alert error={true}>{errors.email}</Alert>
                                                                :null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="telefono">Telefono: </label>
                            <Field id="telefono" type="number" className="mt-2 block w-full p-3 bg-gray-200"
                                     placeholder="33..." name="tel"/>
                            {errors.tel && touched.tel    ? <Alert error={true}>{errors.tel}</Alert>
                                                                :null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="notas">Notas: </label>
                            <Field id="notas" type="text" className="mt-2 block w-full p-3 bg-gray-200 h-40"
                                     placeholder="Notas sobre el cliente" as="textarea" name="notas"/>
                        </div>
                        
                        {exito ?<Alert error={false}>Informacion guardada con exito</Alert> :null}
                        <input type="submit" value={cliente.nombre ? 'Guardar Cambios' : 'Agregar Cliente'}
                                className="mt-5  w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md" />
                    </Form>
                    )}
                </Formik>
            </div>)
     );
}

Formulario.defaultProps={
    cliente:{},
    cargando: false
}
export default Formulario;