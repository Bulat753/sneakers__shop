
import Card from '../Components/Card/Card';
import AppContext from '../Components/Context';
import { useContext} from 'react';
import s from './Favorites.module.scss'
import InfoFavOrd from '../Components/Info/InfoFavOrd';

const Favorites = () => {
  const { favorites, onAddToFavorites } = useContext(AppContext)

  return (
    <div className='content'>
      <div className='content__title'>
        <h2>Мои закладки</h2>
      </div>
      <div className='sneakers__body'>
        {
          favorites.length ?
            favorites
              .map((el, index) =>
                <Card
                  key={el.id}
                  text={el.text}
                  image={el.image}
                  price={el.price}
                  id={el.id}
                  favorited={true}
                  onAddToFavorites={onAddToFavorites}
                />)
            :
              <InfoFavOrd
                image={'/image/notFavorites.svg' }
                title={'Закладок нет :('}
                description={'Вы ничего не добавляли в закладки'}
              />
        }
      </div>
    </div>
  )
}
export default Favorites;