import React, { useState } from 'react'
import './counter.css'
import CountUp from 'react-countup';
import { MdDoneOutline } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { BiSolidDonateHeart } from "react-icons/bi";
// import vid from '../../../public/loop.mp4'

function Counter() {
    const [totalProblem, setTotalProblem] = useState(0)
    const getTotalProblem = async () => {

    }




    return (
        <>
            <div className="counter_con">
                <div className="data_show">
                    <div className="first_count com_count">
                        <IoFastFood className='pro_icon' />
                        <CountUp className='counter_inc' end={186} duration={2.5} delay={0.7}/>
                        <p className='total_pro'>total Donation</p>
                    </div>
                    <Link  to="/reportIssue" className="sec_count com_count">
                        <BiSolidDonateHeart className='pro_icon' />
                        <h3 className='d'>Donate</h3>
                    </Link>
                </div>
                <div className="aids ">
                {/* <video src={vid} autoPlay loop muted controls={false} /> */}
                    <img className='as' src="https://imgs.search.brave.com/RVi4BVAV8pwcJkfwg3v8xR2osrXmJcdkdz7_vQuaIqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXNp/bmVzcy5nZXRvbmJs/b2MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzA2LzEt/My5qcGc" alt="" />
                </div>
            </div>
        </>
    )
}

export default Counter