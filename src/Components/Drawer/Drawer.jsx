import React, { useState } from "react";
import Info from "../Info/Info";
import s from './Drawer.module.scss'
import axios from "axios";
import  {useCart}  from "../../hooks/useCart";

const Drawer = ({ onClickCloseCart, removeOnCart}) => {
  const [completeOrder,setCompleteOrder] = useState(false)
  const [loader,setLoader] = useState(false)
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms))
  const {cartItems,setCartItems,totalPrice,orderId,setOrderId} = useCart()


  const onClickOrder = async () =>{
    try{
      setLoader(true)
      const {data} = await axios.post('https://62473a7c229b222a3fcaa38f.mockapi.io/orders', {items: cartItems})
      setOrderId(data.id) 
      setCompleteOrder(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        console.log(item)
        await axios.delete('https://62473a7c229b222a3fcaa38f.mockapi.io/cart/' + item.id)
        await delay(1000)
      }
    }
    catch(error){
      alert("Не удалось оформить товар :( ")
    } 
    setLoader(false)
  }


  return (
    <div className={s.overloy}>
      <div className={s.drawer}>
        <h3>Корзина <img onClick={onClickCloseCart} src='/image/delete.svg' alt='arrow' /></h3>
        {
          cartItems.length > 0 ?
            (
              <>
                <div className={s.cartItems}>
                  {
                    cartItems.map(el =>
                      <div key={el.image}>
                        <div className={s.cartItem}>
                          <img width={70} height={70} src={el.image} alt='cartItem' />
                          <div className={s.cartItem__price}>
                            <p>{el.text}</p>
                            <b>{el.price}{' руб.'}</b>
                          </div>
                          <div className={s.price__delete}>
                            <img onClick={() => removeOnCart(el.id)} width={32} height={32} src='/image/delete.svg' alt='delete' />
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>

                <div className={s.cartFooter}>
                  <div className={s.cartSumm}>
                    <p>Итого:</p>
                    <div></div>
                    <p>{totalPrice} руб. </p>
                  </div>
                  <div className={s.cartTax}>
                    <p>Налог 5%: </p>
                    <div></div>
                    <p>{totalPrice * 5 /100} руб. </p>
                  </div>
                  <div className={s.cartBtn}>
                    <button style={{cursor:'pointer'}} disabled ={loader} onClick={onClickOrder}> Оформить заказ <img src='/image/arrow.svg' alt='arrow' /></button>
                  </div>
                </div>
              </>
            )
            :
            (
              <Info
              image ={completeOrder ? '/image/completedOrder.svg' : '/image/cartEmpty.svg'}
              title ={completeOrder ? 'Заказ оформлен!' :  'Корзина пустая'}
              description={completeOrder ? `Ваш заказ ${orderId}  скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
              />
            )
        }
      </div>
    </div>
  )
}
export default Drawer;