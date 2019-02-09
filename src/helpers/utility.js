export const updateObject = (oldObj, updatedProps) => {
    return {
        ...oldObj,
        ...updatedProps
    }
}

export const parseErrorCodes = (errorCode) => {
    let errorMessage = null

    if (errorCode === 'EMAIL_EXISTS') {
        errorMessage = 'La direccion de correo ya existe'
    } else if (errorCode.indexOf('TOO_MANY_ATTEMPTS_TRY_LATER') !== -1) {
        errorMessage = 'Ha hecho muchos intentos de autenticacion, por favor intente mas tarde'
    } else if (errorCode === 'EMAIL_NOT_FOUND') {
        errorMessage = 'No se encuentra registrado el correo electronico que especifica'
    } else if (errorCode === 'INVALID_PASSWORD') {
        errorMessage = 'Correo electronico o contraseña incorrectos'
    } else if (errorCode === 'USER_DISABLED') {
        errorMessage = 'Usuario baneado'
    }

    return errorMessage
}