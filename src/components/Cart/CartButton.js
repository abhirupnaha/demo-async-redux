import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const noItems = useSelector(state => state.cart.totalQuantity);

  const toggleCart = () => dispatch(uiActions.toggle());

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}> {noItems} </span>
    </button>
  );
};

export default CartButton;
