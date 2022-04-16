import { useContext } from 'react'
import AppContext from '../Context';
import s from './InfoFavOrd.module.scss'
import { Link } from 'react-router-dom';

const InfoFavOrd = ({ image, title, description }) => {
    return (
        <div>
            <div className={s.cartEmpty}>
                <div className={s.empty}>
                    <img src={image} alt="cartEmpty" />
                    <p style={{ fontSize: '22px' }}>{title}</p>
                    <p className={s.empty__p} style={{ opacity: '0.5' }}>{description}</p>
                </div>
                <div className={s.emptyButton}>
                    <Link to ='/'>
                        <button style={{cursor: 'pointer'}}> Вернуться назад <img src='/image/arrowReverse.svg' alt='arrow' /></button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default InfoFavOrd;