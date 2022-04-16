import Card from '../Components/Card/Card';
const Home = ({searchValue,setSearchValue,data,onAddToCart,onAddToFavorites,cartItems,loader}) =>{
    return(
        <div className='content'>
        <div className='content__title'>
          <h2>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h2>
          <div className='search__block'>
            <img src='/image/search.svg' alt='Search' />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Поиск...'
            />
            {searchValue &&
              <span onClick={() => setSearchValue('')}>
              <img src='/image/delete.svg' alt='searchDelete' />
            </span>
            }
          </div>
        </div>
        <div className='sneakers__body'>
          {
              (loader ? [1,1,1,1,1,1,1,1,1,1,1,1] :data.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase())))
              .map((el, index) =>
                <Card
                  key={el.imageUrl}
                  text={el.title}
                  image={el.imageUrl}
                  price={el.price}
                  id = {el.id}
                  parentId = {el.parentId}
                  onAddToCart={(obj) => onAddToCart(obj)}
                  onAddToFavorites = {(obj) => onAddToFavorites(obj)}
                  added = {cartItems.some(item => Number(item.id) === Number(el.id))}
                  loading = {loader}
                />)
                
          }
          {console.log(loader)}
        </div>
      </div>
    )
}
export default Home;