import React, { Component } from 'react';

import Stylesheet from './BurgerIngredient.css';
import PropTypes from 'prop-types';


class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        let ingredientType = this.props.type

        if (ingredientType === 'bread-bottom')
            ingredient = <div className={Stylesheet.BreadBottom}></div>
        else if (ingredientType === 'bread-top')
            ingredient = (
                <div className={Stylesheet.BreadTop}>
                    <div className={Stylesheet.Seeds1}></div>
                    <div className={Stylesheet.Seeds2}></div>
                </div>
            )
        else if (ingredientType === 'meat')
            ingredient = <div className={Stylesheet.Meat}></div>
        else if (ingredientType === 'cheese')
            ingredient = <div className={Stylesheet.Cheese}></div>
        else if (ingredientType === 'salad')
            ingredient = <div className={Stylesheet.Salad}></div>
        else if (ingredientType === 'bacon')
            ingredient = <div className={Stylesheet.Bacon}></div>
        else
            ingredient = null

        return ingredient
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;