import React from 'react';

import Stylesheet from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';


const buildControls = (props) => {
    return (
        <div className={Stylesheet.BuildControls}>
            <p>Total a pagar: <strong>$ {props.price.toLocaleString()} COP</strong></p>
            {props.controls.map((ctrl, index) => (
                <BuildControl key={ctrl.id} label={ctrl.label} 
                    added={() => props.onAddedIngredient(index, ctrl.type)} removed={() => props.onRemovedIngredient(index, ctrl.type)}
                    disabled={props.disabled[ctrl.type] !== undefined ? props.disabled[ctrl.type] : true} />
            ))}
            <button className={Stylesheet.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.clicked}>Pedir esta deliciosa Hamburguesa</button>
        </div>
    )
}

export default buildControls;