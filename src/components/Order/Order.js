import React from 'react';

import Stylesheet from './Order.css';

const order = (props) => {
    const ingredientsList = []

    for (let name in props.ingredients) {
        ingredientsList.push({name: name, amount: props.ingredients[name]})
    }
    
    const ingredientOutput = ingredientsList.map(ig => 
        <span 
            key={ig.name} 
            style={{
                textTransform: 'capitalize',
                margin: '0px 4px',
                padding: '4px',
                border: '1px solid #ccc'
            }}>{ig.name} ({ig.amount})</span>
    )

    return (
        <div className={Stylesheet.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>COP ${props.price.toFixed(0)}</strong></p>
        </div>
    )
}

export default order;