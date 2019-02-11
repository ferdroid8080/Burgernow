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


export const checkValidations = (value, rules) => {
    let isValid = true
    
    if (rules.required) {
        isValid = value.trim().length !== 0 && isValid
    }

    if (rules.min) {
        isValid = value.trim().length >= rules.min && isValid
    }

    if (rules.max) {
        isValid = value.trim().length <= rules.max && isValid
    }

    if (rules.isEmail) {
        isValid = emailValid(value.trim()) && isValid
    }

    return isValid
}


export const emailValid = (email='') => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}