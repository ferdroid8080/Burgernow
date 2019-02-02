import React from 'react';

import Stylesheet from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';


const buildControls = (props) => {
    return (
        <div className={Stylesheet.BuildControls}>
            <p>Total a pagar: <strong>$ {props.price.toLocaleString()} COP</strong></p>
            {props.controls.map((ctrl, index) => {
                return <BuildControl key={ctrl.id} label={ctrl.label} 
                    added={() => props.onAddedIngredient(ctrl.id)} removed={() => props.onRemovedIngredient(ctrl.id)}
                    disabled={ctrl.count && ctrl.count > 0 ? false : true} />
            })}
            <button className={Stylesheet.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.clicked}>Pedir esta deliciosa Hamburguesa</button>
        </div>
    )
}

export default buildControls;