import React from 'react';

import Stylesheet from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Cebolla', type: 'salad' },
    { label: 'Tocino', type: 'bacon' },
    { label: 'Carne', type: 'meat' },
    { label: 'Queso', type: 'cheese' },
]


const buildControls = (props) => {
    return (
        <div className={Stylesheet.BuildControls}>
            <p>Total a pagar: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} 
                    added={() => props.onAddedIngredient(ctrl.type)} removed={() => props.onRemovedIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button className={Stylesheet.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.clicked}>Pedir esta deliciosa Hamburguesa</button>
        </div>
    )
}

export default buildControls;