import React from 'react';

import Stylesheet from './Input.css';

const inputCustom = (props) => {
    let inputElement = null, validationMessageError = null
    let inputClass = [Stylesheet.InputElement]

    if (!props.valid && props.shouldValidate && props.touched) {
        inputClass.push(Stylesheet.Invalid)
        validationMessageError = <p style={{margin: 0}}>Por favor ingrese informacion valida</p>
    }

    if (props.elementType === 'input') {
        inputElement = <input 
                            className={inputClass.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value} onChange={props.changed} />
    } else if (props.elementType === 'textarea') {
        inputElement = <textarea 
                            className={inputClass.join(' ')} 
                            {...props.elementConfig} onChange={props.changed}>{props.children}</textarea>
    } else if (props.elementType === 'select') {
        inputElement = (
            <select value={props.value} className={inputClass.join(' ')} onChange={props.changed}>
                {props.elementConfig.options.map(opt =>
                    <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                )}
            </select>
        )
    } else {
        inputElement = <input 
                            className={inputClass.join(' ')} 
                            {...props.elementConfig} onChange={props.changed} />
    }

    return (
        <div className={Stylesheet.Input}>
            <label className={Stylesheet.Label}>{props.label}</label>
            {inputElement}
            {validationMessageError}
        </div>
    )
}

export default inputCustom;