import { useState } from 'react'
import './App.scss'
import logo from './assets/images/logo.png'
import kimppabImage from './assets/images/kimpab.jpg'
import combo1 from './assets/images/combo1.webp'
import ramen from './assets/images/ramen.jpg'
import pibimpab from './assets/images/pibimpab.jpg'
import tokpoki from './assets/images/tokpoki.webp'

export const App = () => {

    const [menu] = useState([
        {
            id: 1,
            name: 'Сет №1',
            category: 'Комбо',
            price: 20,
            description: 'Рамен сырный, кимпаб жареный, чикен в соусе, кимчи',
            image: combo1,
            ingridients: ['Рамен сырный', 'Кимпаб жареный', 'Кимчи']
        },
        {
            id: 2,
            name: 'Рамён',
            category: 'Лапша',
            price: 20,
            description: 'Классический рамён с яйцом и морской капустой',
            image: ramen,
            ingridients: ['Яйцо', 'Морская капуста', 'Зеленый лук', 'Кукуруза', 'Морковь', 'Грибы']
        },
        {
            id: 3,
            name: 'Пибимпаб',
            category: 'Вторые блюда',
            price: 20,
            description: 'Рис с овощами, мясом в остром соусе. Подается с бульеном',
            image: pibimpab,
            ingridients: ['Рис', 'Мясо', 'Овощи', 'Острый соус', 'Бульен', 'Яйцо']
        },
        {
            id: 4,
            name: 'Кимпаб запеченый',
            category: 'Кимпаб',
            price: 20,
            description: 'Запеченый кимпаб с курицей или тунцом или говядиной',
            image: kimppabImage,
            ingridients: ['Рис', 'Морская капуста', 'Курица/Тунец/Говядина', 'Огурец', 'Морковь', 'Шпинат']
        },
        {
            id: 5,
            name: 'Токпокки',
            category: 'Горячие закуски',
            price: 20,
            description: 'Острые рисовые палочки с яйцом, сыром или колбасой',
            image: tokpoki,
            ingridients: ['Рисовые палочки', 'Острый соус', 'Яйцо', 'Сыр/Колбаса', 'Зеленый лук']
        },
    ])

    const [category, setCategory] = useState('Все')

    const handleChangeCategory = (e: React.MouseEvent<HTMLLIElement>) => {
        setCategory(e.currentTarget.innerText)
    }

    const handleActiveClass = (e: React.MouseEvent<HTMLLIElement>) => {
        const categories = document.querySelectorAll('.categories ul li')
        categories.forEach(cat => cat.classList.remove('active'))
        e.currentTarget.classList.add('active')
        // Используйте e.currentTarget для консистентности.
    }

    const [modal, setModal] = useState(false)

    const [modalId, setModalId] = useState(null)

    const handleModal = (id?: number) => {
        if (id !== undefined) {
            setModalId(id);
        }
        setModal(!modal);
    }



    return (
        <div className="menu-app">
            <div className="container">

                <header className="header">
                    <div className="title">
                        <img src={logo} alt="" />
                        <h1>KIMPAB</h1>
                    </div>
                    <div className="categories">
                        <ul>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }} className='active'>Все</li>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }}>Комбо</li>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }}>Лапша</li>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }}>Вторые блюда</li>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }}>Кимпаб</li>
                            <li onClick={(e) => { handleChangeCategory(e); handleActiveClass(e) }}>Горячие закуски</li>
                        </ul>
                    </div>
                </header>
                <main className="main">
                    <div className="main-content">
                        <div className="main-content-list">
                            {category === 'Все' ? menu.map(item => (
                                <div className="main-content-list-item" key={item.id} onClick={() => handleModal(item.id)}>
                                    <div className="item-image">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-info-header">
                                            <h2>{item.name}</h2>
                                            <span className='price'>{item.price} $</span>
                                        </div>
                                        <p className='description'>{item.description}</p>
                                    </div>
                                </div>
                            )) :
                                menu.filter(item => item.category === category).map(filteredItem => (
                                    <div className="main-content-list-item" key={filteredItem.id} onClick={() => handleModal(filteredItem.id)}>
                                        <div className="item-image">
                                            <img src={filteredItem.image} alt="" />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-info-header">
                                                <h2>{filteredItem.name}</h2>
                                                <span className='price'>
                                                    {filteredItem.price} $
                                                </span>
                                            </div>
                                            <p className='description'>{filteredItem.description}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </main >
                {modal && (
                    <div className="modal">
                        <div className="modal-content">
                            {menu.filter(item => item.id === Number(modalId)).map(modalItem => (
                                <div className="modal-content-item" key={modalItem.id}>
                                    <div className="item-image">
                                        <img src={modalItem.image} alt="" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-info-header">
                                            <h2>{modalItem.name}</h2>
                                            <span className='price'>
                                                {modalItem.price} $
                                            </span>
                                        </div>
                                        <p className='description'>{modalItem.description}</p>
                                        <h3 className='ingridients'>Ингридиенты:</h3>
                                        <ul className='ingridients-list'>
                                            {modalItem.ingridients.map((ingredient, index) => (
                                                <li className='ingridients-list-item' key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                        <button className='close' onClick={handleModal}>Закрыть</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div >
        </div >
    )
}

export default App