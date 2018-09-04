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
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} added={() => props.onAddedIngredient(ctrl.type)} removed={() => props.onRemovedIngredient(ctrl.type)} />
            ))}
        </div>
    )
}

export default buildControls;