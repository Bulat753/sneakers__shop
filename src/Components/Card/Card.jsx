import React, { createContext, useContext, useState } from "react";
import s from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from "../Context";
const Card = ({ image, text, price, onAddToCart, onAddToFavorites, favorited, id, loading = false,parentId }) => {

    const [favorite, setFavorite] = useState(favorited)
    const {isItemAdded} = useContext(AppContext)
    
    const onPlus = () => {
        onAddToCart({ image, text, price, id, parentId: id })
    }
    const onClickFavorite = () => {
        setFavorite(!favorite)
        onAddToFavorites({ image, text, price, id })
    }

    return (
        <div className={s.sneaker__item}>
            {
                loading ?
                    <ContentLoader
                        speed={2}
                        width={210}
                        height={260}
                        viewBox="0 0 210 260"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="30" y="36" rx="10" ry="10" width="150" height="91" />
                        <rect x="30" y="143" rx="3" ry="3" width="150" height="15" />
                        <rect x="30" y="162" rx="3" ry="3" width="93" height="15" />
                        <rect x="30" y="199" rx="8" ry="8" width="80" height="24" />
                        <rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader>
                    
                    :
                    <>
                    <div className={s.sneaker__content}>
                        <div className={s.favorite}>
                            <img onClick={onClickFavorite} src={favorite ? '/image/liked.svg' : '/image/unliked.svg'} alt='heartUnliked' />
                        </div>
                        <img src={image} alt='УПС, не подгрузилось' />
                        <h5>{text}</h5>
                        <div className={s.item__bottom}>
                            <div className={s.item__price}>
                                <p>Цена:</p>
                                <b>{price} {' руб.'}</b>
                            </div>
                            <div className={s.item__button}>
                                { onAddToCart &&
                                    <img style ={{cursor: 'pointer'}} onClick={onPlus} src={!isItemAdded(id) ? '/image/plus.svg' : '/image/btn__checked.svg'} alt='Plus' />
                                }
                            </div>
                        </div>
                    </div>
                    </>
            }
        </div>

    )
}
export default Card;