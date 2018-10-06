import React from 'react';

import Stylesheet from './Input.css';

const inputCustom = (props) => {
    let inputElement = null
    if (props.elementType === 'input') {
        inputElement = <input 
                            className={Stylesheet.InputElement} 
                            {...props.elementConfig} 
                            value={props.value} onChange={props.changed} />
    } else if (props.elementType === 'textarea') {
        inputElement = <textarea 
                            className={Stylesheet.InputElement} 
                            {...props.elementConfig} onChange={props.changed}>{props.children}</textarea>
    } else if (props.elementType === 'select') {
        inputElement = (
            <select value={props.value} className={Stylesheet.SelectInput} onChange={props.changed}>
                {props.elementConfig.options.map(opt =>
                    <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                )}
            </select>
        )
    } else {
        inputElement = <input 
                            className={Stylesheet.InputElement} 
                            {...props.elementConfig} onChange={props.changed} />
    }

    return (
        <div className={Stylesheet.Input}>
            <label className={Stylesheet.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default inputCustom;