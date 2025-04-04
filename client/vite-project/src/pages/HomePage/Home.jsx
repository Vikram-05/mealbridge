import React from 'react'

import Search from '../../components/searchBar/Search';
import Counter from '../../components/counter/Counter'
import Cards from '../../components/cards/Cards'
import './Home.css'

function Home() {
    return (
        <>
            <div className="home_contaner">
                <h2>A Meal Away from Kindness</h2>
                <p className='disc'>Fostering a sustainable, community-driven meal-sharing network</p>
                <Search/>
                <Counter/>
                <Cards/>
            </div>
        </>
    )
}
export default Home;
