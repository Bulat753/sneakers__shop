import logo from './logo.svg';
import './App.css';
import Drawer from './Components/Drawer/Drawer';
import Header from './Components/Header/Header';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './Components/Context';
import Orders from './pages/Orders';

function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [data, setData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [loader, setLoader] = useState(true)
  const [orderId,setOrderId] = useState(null)

  const getData = async () => {
    const response = await axios.get('https://62473a7c229b222a3fcaa38f.mockapi.io/data');
    console.log(response.data)
    setData(response.data)
  }
  // ВОПРОС
  const getCart = async () => {
    const response = await axios.get('https://62473a7c229b222a3fcaa38f.mockapi.io/cart');
    setCartItems(response.data)
  }
  const getFavorite = async () => {
    const response = await axios.get(`https://62473a7c229b222a3fcaa38f.mockapi.io/favorites`)
    setFavorites(response.data)
  }
  useEffect(() => {
    try {
      const fetchData = async () => {
        const [cartResponse,favoriteResponse,dataResponse] = await Promise.all([
          axios.get('https://62473a7c229b222a3fcaa38f.mockapi.io/cart'),
          axios.get(`https://62473a7c229b222a3fcaa38f.mockapi.io/favorites`),
          axios.get('https://62473a7c229b222a3fcaa38f.mockapi.io/data') ,
        ]);
    
        setLoader(false)
        setCartItems(cartResponse.data)
        setFavorites(favoriteResponse.data)
        setData(dataResponse.data)
      }
      fetchData()
    }
    catch (error) {
      alert('Ошибка при запросе данных')
    }


  }, [])

  const onAddToCart = async (obj) => {
    console.log(obj)
    const findItem = cartItems.find(el => Number(el.parentId) === Number(obj.id))
    if (findItem) {
      await axios.delete(`https://62473a7c229b222a3fcaa38f.mockapi.io/cart/${findItem.id}`)
      setCartItems((prev) => prev.filter(el => Number(el.parentId) !== Number(obj.id)))
      
    }
    else {
      const {data} = await axios.post('https://62473a7c229b222a3fcaa38f.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, data])
    }

  }
  // Удаление товара из корзины
  const removeOnCart = (id) => {
    try {
      axios.delete(`https://62473a7c229b222a3fcaa38f.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(el => el.id !== id))
    }
    catch (error) {
      alert('Ошибка при удалении из корзины')
    }
  }

  // Избранные
  const onAddToFavorites = (obj) => {
    try {
      if (favorites.find(el => el.id === obj.id)) {
        axios.delete(`https://62473a7c229b222a3fcaa38f.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter(el => Number(el.id) !== Number(obj.id)))
      }
      else {
        axios.post('https://62473a7c229b222a3fcaa38f.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, obj])
      }
    }
    catch (error) {
      alert('Ошибка при выводу избранных')
    }
  }


  const isItemAdded = (id) => {
    return cartItems.some(el => Number(el.parentId) === Number(id))
  }




  return (
    <AppContext.Provider value={{ data, cartItems, favorites, isItemAdded, onAddToFavorites, setCartOpened, setCartItems, cartItems, loader,orderId,setOrderId }}>
      <div className="wrapper">
        {cartOpened &&
          <Drawer
            onClickCloseCart={() => setCartOpened(false)}
            cartItems={cartItems}
            removeOnCart={removeOnCart}
            opened={cartOpened}
          />
        }
        <Header
          onClickCart={() => setCartOpened(true)}
        />

        <Routes>
          <Route path='/' element={
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              data={data}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              cartItems={cartItems}
              loader={loader}

            />} />
          <Route path='/favorites' element={
            <Favorites />} />
          <Route path='/orders' element={
            <Orders />
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
