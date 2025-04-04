import React from 'react'
import './LeaderBoard.css'

function LeaderBoard() {
    return (
        <>
            <div class="container">
                <h1>Top Donors</h1>
                <ul class="leaderboard">
                    <li>
                        <span class="rank">#1</span>
                        <div class="details">
                            <span class="name">The Green Bowl</span><br/>
                                <span class="location">Indiranagar, Bangalore</span>
                        </div>
                        <span class="donation">150 Meals Donated</span>
                    </li>
                    <li>
                        <span class="rank">#2</span>
                        <div class="details">
                            <span class="name">Spice Junction</span><br/>
                                <span class="location">Koramangala, Bangalore</span>
                        </div>
                        <span class="donation">130 Meals Donated</span>
                    </li>
                    <li>
                        <span class="rank">#3</span>
                        <div class="details">
                            <span class="name">Urban Tadka</span><br/>
                                <span class="location">Whitefield, Bangalore</span>
                        </div>
                        <span class="donation">110 Meals Donated</span>
                    </li>
                    <li>
                        <span class="rank">#4</span>
                        <div class="details">
                            <span class="name">Flavors of India</span><br/>
                                <span class="location">Jayanagar, Bangalore</span>
                        </div>
                        <span class="donation">95 Meals Donated</span>
                    </li>
                    <li>
                        <span class="rank">#5</span>
                        <div class="details">
                            <span class="name">The Hunger Stop</span><br/>
                                <span class="location">MG Road, Bangalore</span>
                        </div>
                        <span class="donation">85 Meals Donated</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default LeaderBoard