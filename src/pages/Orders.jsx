import React, { useContext, useEffect, useState } from 'react';
import Card from '../Components/Card/Card';
import axios from 'axios';
import AppContext from '../Components/Context';
import InfoFavOrd from '../Components/Info/InfoFavOrd';


const Orders = () => {
  const [orders, setOrders] = useState([])
  const { onAddToCart, onAddToFavorites, cartItems, orderId } = useContext(AppContext)
  const [loader, setLoader] = useState(true)
  const getOrder = async () => {
    const response = await axios.get(`https://62473a7c229b222a3fcaa38f.mockapi.io/orders`);
    setOrders(response.data);
    console.log(response.data)
    setLoader(false)
  }
  useEffect(() => {
    try {
      getOrder();
    }
    catch {
      alert('Ошибка, не удалось подгрузить мои заказы')
    }
  }, [])

  return (
    <div className='content'>
      <div className='content__title'>
        <h2>Мои покупки</h2>
      </div>
      <div className='sneakers__body-order'>
        {
            loader ?
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i, index) =>
            <Card
              key={index}
              text={i.text}
              image={i.image}
              price={i.price}
              id={i.id}
              onAddToFavorites={(obj) => onAddToFavorites(obj)}
              loading={loader}
            />
            )
            :

        orders.length ?
              orders.map((el, index) =>
        <>
          <h3>Заказ №{el?.id}</h3>
          <div className='sneakers__item-order'>
            {el?.items?.map(item =>
              <Card
                key={item.id}
                text={item.text}
                image={item.image}
                price={item.price}
                id={item.id}
                onAddToFavorites={(obj) => onAddToFavorites(obj)}
                loading={loader}
              />)
            }
          </div>
        </>
        )
        :
        <InfoFavOrd
          image={'/image/notOrders.svg'}
          title={'У вас нет заказов'}
          description={'Вы нищеброд? Оформите хотя бы один заказ'}
        />
        }
      </div>
    </div>
  )
}
export default Orders;