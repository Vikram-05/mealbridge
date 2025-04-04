import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid rgba(0,0,0,0.5)',
    boxShadow: 24,
    p: 4,
};

function Cards() {
    const [problemUnderYourArea, setProblemUnderYourArea] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null); 
    const [openReview, setOpenReview] = useState(false)
    const [creditScore, setCreditScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const imgs = ["https://tse4.mm.bing.net/th?id=OIP.wPqc_gcHQnhtw75cOjzVBQHaE8&pid=Api&P=0&h=180","https://tse2.mm.bing.net/th?id=OIP.5XZGu7I9rqQc67dpzviiugHaE7&pid=Api&P=0&h=180","https://tse1.mm.bing.net/th?id=OIP.OM_YQDFEEZ6NPj0XapYwFgHaEo&pid=Api&P=0&h=180","https://tse4.mm.bing.net/th?id=OIP.BJZuAZfQRH9Cv7vDEyJ1dQHaE7&pid=Api&P=0&h=180","https://tse1.mm.bing.net/th?id=OIP.nHdjesbJ7Yc8yl2bJQuY7wHaEo&pid=Api&P=0&h=180","https://tse4.mm.bing.net/th?id=OIP.3V2fvdA6O0fSG6qGMyMeZwHaEo&pid=Api&P=0&h=180","https://tse2.mm.bing.net/th?id=OIP._tgM80_g7K1ymkC1gpvxZAHaE8&pid=Api&P=0&h=180","https://tse2.mm.bing.net/th?id=OIP.ZXLPCs_7NlKfIzxQiFN14QHaEK&pid=Api&P=0&h=180"]

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const problemsUnderYou = async () => {
            try {
                const response = await axios.get(`http://localhost:5700/api/users/problem/problemUnderRep/${userId}`);
                const sortedProblems = response.data.AllProblemData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 
                setProblemUnderYourArea(sortedProblems);
            } catch (error) {
                console.log("Problem on fetching problem data", error);
            }
        };
        problemsUnderYou();
    }, []);

    const handleSubmitQuantity = (idx) => {
        if (selectedCard === idx) {
            setSelectedCard(null); 
        } else {
            setSelectedCard(idx); 
        }
    };

    const handleOpenReview = (probId) => {
        setOpenReview(probId);
    }

    const handleCloseReview = () => {
        setOpenReview(false);
    }

    const reviewFunction = async (problemId) => {
        try {
            const userId = localStorage.getItem('user_id');
            const repDetail = await axios.get(`http://localhost:5700/api/users/problem/getProblemData/${problemId}`);
            const { assignTo_id, _id, user_id } = repDetail.data.data;
            await axios.post('http://localhost:6600/api/users/credit', { assignTo_id: userId, user_id, problemId, creditScore, feedback });
            setCreditScore('');
            toast("Review Submitted");
            setOpenReview(false);
        } catch (error) {
            setCreditScore('');
            console.error("Error in review function", error);
        }
    }

    return (
        <>
            <div className="container_card">
                {problemUnderYourArea.map((item, idx) => (
                    <div key={idx} className="card">
                        <img
                            src={imgs[idx]}
                            alt="Problem Image"
                        />
                        <div className="card-content">
                            <div className="title">{item.description}</div>
                            <div className="offer">{item.title}</div>
                            <div className="info">
                                <span>⏳ {item.severity} plates remaining</span>
                                <span className="rating">4.3⭐</span>
                            </div>
                            <button
                                className="dropdown-btn"
                                onClick={() => handleSubmitQuantity(idx)}
                            >
                                Accept
                            </button>
                            <Modal
                                open={openReview == item._id}
                                onClose={handleCloseReview}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <IoClose className='close_btn' onClick={handleCloseReview} />
                                    <h2>Review Form</h2>
                                    <label>Give Credit Score (0 - 10)</label>
                                    <input type="number" min="0" max="10" placeholder='Between 0 to 10' onChange={(e) => setCreditScore(e.target.value)} required />
                                    <label>Feedback</label>
                                    <textarea placeholder="Enter your feedback..." onChange={(e) => setFeedback(e.target.value)} required></textarea>
                                    <button type="submit" className="submit-btn" onClick={() => reviewFunction(item._id)}>Submit</button>
                                </Box>
                            </Modal>
                            <div className="dropdown-menu">
                                {selectedCard === idx ? (
                                    <button className="dropdown-btn df" onClick={() => handleOpenReview(item._id)}>Review</button>
                                ) : (
                                    <input
                                        required
                                        type="number"
                                        className="input-number"
                                        placeholder="Enter quantity"
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    );
}

export default Cards;
