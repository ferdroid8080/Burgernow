import React from 'react';

import Stylesheet from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    return (
        <div className={Stylesheet.Burger}>
        <BurgerIngredient type="bread-top" />
        <BurgerIngredient type="cheese" />
        <BurgerIngredient type="meat" />
        <BurgerIngredient type="salad" />
        <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;