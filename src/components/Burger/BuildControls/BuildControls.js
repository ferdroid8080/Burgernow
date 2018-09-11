import React from 'react';

import Stylesheet from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

// const controls = [
//     { label: 'Cebolla', type: 'salad' },
//     { label: 'Tocino', type: 'bacon' },
//     { label: 'Carne', type: 'meat' },
//     { label: 'Queso', type: 'cheese' },
// ]


const buildControls = (props) => {
    const disabledIngredientCount = Object.keys(props.disabled).length

    return (
        <div className={Stylesheet.BuildControls}>
            <p>Total a pagar: <strong>${props.price.toFixed(2)} USD</strong></p>
            {props.controls.map((ctrl, index) => (
                <BuildControl key={ctrl.id} label={ctrl.label} 
                    added={() => props.onAddedIngredient(index, ctrl.type)} removed={() => props.onRemovedIngredient(index, ctrl.type)}
                    disabled={disabledIngredientCount > 0 ? props.disabled[ctrl.type] : true} />
            ))}
            <button className={Stylesheet.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.clicked}>Pedir esta deliciosa Hamburguesa</button>
        </div>
    )
}

export default buildControls;