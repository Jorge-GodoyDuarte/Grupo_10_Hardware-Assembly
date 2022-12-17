module.exports = (error) => {
    if(!error.errors){
        return error.message || "Ha ocurrido un error! Comuníquese con el administrador"
    }
    let errorsObject = {}
    
    error.errors.forEach(error => {
        errorsObject = {
            ...errorsObject,
            [error.path] : error.message
        }
    });
    return errorsObject;
}