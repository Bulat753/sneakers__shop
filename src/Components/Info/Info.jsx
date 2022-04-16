import {useContext} from 'react'
import AppContext from '../Context';
import s from './Info.module.scss'

const Info = ({ image, title, description }) => {
    const { setCartOpened } = useContext(AppContext)
    return (
        <div>
            <div className={s.cartEmpty}>
                <div className={s.empty}>
                    <img src={image} alt="cartEmpty" />
                    <p style={{ fontSize: '22px' }}>{title}</p>
                    <p className={s.empty__p} style={{ opacity: '0.5' }}>{description}</p>
                </div>
                <div className={s.emptyButton}>
                    <button style={{cursor: "pointer"}} onClick={() => setCartOpened(false)}> Вернуться назад <img src='/image/arrowReverse.svg' alt='arrow' /></button>
                </div>
            </div>
        </div>
    )
}
export default Info;
