
const Alert = ({children, error}) => {
    return ( 
        <div className={`${error ?'bg-red-600' :'bg-green-600'} rounded-md text-white font-bold p-3 uppercase m-4`}>
            {children}
        </div>
     );
}
 
export default Alert;