import React from 'react';

import Stylesheet from './Order.css';

const order = (props) => {
    const ingredientsList = props.ingredients.filter(v => v.count && v.count > 0)
    
    const ingredientOutput = ingredientsList.map(ig => 
        <span 
            key={ig.id} 
            style={{
                textTransform: 'capitalize',
                margin: '0px 4px',
                padding: '4px',
                border: '1px solid #ccc'
            }}>{ig.label} ({ig.count})</span>
    )

    return (
        <div className={Stylesheet.Order}>
            <p>Ingredientes: {ingredientOutput}</p>
            <p>Total a pagar: <strong>COP ${props.price.toLocaleString()}</strong></p>
        </div>
    )
}

export default order;