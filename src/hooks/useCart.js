import React from "react"
import { useContext } from "react"
import AppContext from "../Components/Context"
export const useCart = () =>{
    const{cartItems,setCartItems,orderId,setOrderId} = useContext(AppContext)
    const totalPrice = cartItems.reduce((summ,obj) => obj.price + summ,0)
    return{cartItems,setCartItems,totalPrice,orderId,setOrderId}
}
