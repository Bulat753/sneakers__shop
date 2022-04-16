import React, { useContext } from "react";
import s from './Header.module.scss'
import { Link } from 'react-router-dom';
import AppContext from "../Context";
const Header = ({ onClickCart }) => {
  const {cartItems} = useContext(AppContext)
  const totalPrice = cartItems.reduce((summ,obj) => obj.price + summ,0)
  return (
    <header className={s.header}>
      <Link style={{color:'black', textDecoration:'none'}} to='/'>
        <div className={s.headerLeft}>
          <img width={40} height={40} src='/image/logo.png' />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div className={s.headerRight}>
        <img onClick={onClickCart} style={{ cursor: 'pointer' }} width={18} height={18} src='/image/cart.svg' />
        <p>{totalPrice} руб.</p>
        <Link to ='/favorites'>
          <img width={18} height={18} src='/image/like.svg' />
        </Link>
        <Link to = '/orders'>
          <img className={s.imgOrders} width={18} height={18} src='/image/user.svg' />
        </Link>
        
      </div>
    </header>
  )
}
export default Header;