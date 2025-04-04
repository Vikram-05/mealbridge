import React, { useEffect, useState } from 'react'
import './RepresentativeProfile.css'
import Avatar from '@mui/material/Avatar';
import { MdOutlineStars } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { HiExclamationTriangle } from "react-icons/hi2";

import axios from 'axios';
import { useParams } from 'react-router-dom';

function RepresentativeProfile() {
    const [representativeData, setRepresentativeData] = useState(null);
    const [RepsCredit, setRepCredit] = useState();
    const [AllReview, setAllReview] = useState([])
    const [reviewUsers, setReviewUsers] = useState({});
    const { id } = useParams()

    useEffect(() => {
        const AllRep = async (e) => {
            const user_id = localStorage.getItem('user_id')
            let total = 0;
            let count = 0;
            try {
                const res = await axios.get(`http://localhost:5700/api/users/credit/getSimilarRep/${user_id}`)
                // setRepCredit(res.data)
                for (let score of res.data.AllRepresentative) {
                    total += score.credit_score;
                    count++;
                    // console.log("score ",total)
                }
                total = Math.floor(total / count)
                setRepCredit(total)

            } catch (error) {
                console.log("Error in updating status: ", error);
            }
        }
        AllRep()
        const handleAllReviews = async () => {
            const user_id = localStorage.getItem('user_id')
            try {
                const res = await axios.get(`http://localhost:5700/api/users/credit/getSimilarRep/${user_id}`);
                console.log("dd : ", res)
                setAllReview(res.data.AllRepresentative);

                // Create a list of promises to fetch user data for each review
                const userNamesPromises = res.data.AllRepresentative.map(async (review) => {
                    const userRes = await axios.get(`http://localhost:5700/api/users/${review.user_id}`);
                    return { userId: review.user_id, name: `${userRes.data.first_name} ${userRes.data.last_name}` };
                });

                // Wait for all the user data to be fetched
                const userNamesData = await Promise.all(userNamesPromises);

                // Create a user lookup object
                const userNames = userNamesData.reduce((acc, { userId, name }) => {
                    acc[userId] = name;
                    return acc;
                }, {});

                setReviewUsers(userNames);

            } catch (error) {
                console.log("Error in fetching reviews: ", error);
            }
        };

        handleAllReviews();
        // Fetch data for the representative when the component mounts or id changes
        const fetchData = async () => {
            try {
                console.log("Fetching representative data for ID:", id);
                const response = await axios.get(`http://localhost:5700/api/users/representativeProfile/${id}`);
                setRepresentativeData(response.data.data);
                console.log("res ", response.data.data)
            } catch (error) {
                console.log("Error in fetching representative data", error);
            }
        };

        // Only fetch data if id is available
        if (id) {
            fetchData();
        }
    }, [id]);
    if (!representativeData) {
        return <p className='loader'>Loading...</p>; // You can show a loading spinner or message
    }




    return (
        <>
            <div className="repsantative_contaner">
                <div className="profile_det_con">
                    <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <p className="rep_name">{`${representativeData.first_name} ${representativeData.last_name}`}</p>
                    <span className="email d_block">{`Email : ${representativeData.email}`}</span>
                    <span className="location_area d_block">{`State : ${representativeData.state}`}</span>
                    <span className="location_area d_block">{`District : ${representativeData.district} ward number :  ${representativeData.wardNumber}`}</span>
                    <div className="contact_btn_con">
                        <button className='contact_btn'>Contact Doner</button>
                        <button className="view">View Service Area</button>
                    </div>
                </div>
                <div className="credit_det_con">
                    <MdOutlineStars className='icon' />
                    <p className='credit_score'>Rating : {RepsCredit}</p>
                    <button className='view_his'>View History</button>

                </div>



                <h4>Recent Reviews</h4>

                <div className="review_main_con">

                    {
                        AllReview.map((item, idx) => (
                            <div key={item._id} className="review_con">
                                <Avatar className='avtar' alt="Remy Sharp" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                                <div className="avtar_det">
                                    <p className="name">{reviewUsers[item.user_id]}</p>
                                    <span className="message">{(item.feedback).split(' ').length > 10 ? item.feedback.split(' ').slice(0, 6).join(' ') + "..." : item.feedback}<span className="credit_score">{`|  credit Score :  +${item.credit_score}`}</span></span>

                                </div>
                                <AiOutlineLike className='like' />
                            </div>
                        ))
                    }


                </div>

                <h5>Leave a Review</h5>
                <textarea placeholder="Share your experience with this representative" name="" id=""></textarea>

                <button className='submit_rev'>Submit Review</button>

            </div>
        </>
    )
}

export default RepresentativeProfile 