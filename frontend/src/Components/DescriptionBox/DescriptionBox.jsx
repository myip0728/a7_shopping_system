import React, { useState, useEffect } from 'react'
import './DescriptionBox.css'

const DescriptionBox = (props) => {
    const { product } = props;
    const [descriptionVisible, setdescriptionVisible] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(product.comment);

    useEffect(() => {
        setdescriptionVisible(true);
    }, [product]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handlePostComment = (event) => {
        //The below will need to changed to real http request after the backend is establish
        event.preventDefault();
        if (newComment.trim() !== '') {
            const username = 'John Doe'; // Replace with the actual username
            const comment = { username, text: newComment };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className={descriptionVisible === true ? "descriptionbox-nav-box" : "descriptionbox-nav-box fade"} onClick={() => setdescriptionVisible(true)}>Description</div>
                <div className={descriptionVisible === false ? "descriptionbox-nav-box" : "descriptionbox-nav-box fade"} onClick={() => setdescriptionVisible(false)} >Comments ({product.comment.length})</div>
            </div>
            {descriptionVisible && (
                <div className="description-Section">
                    <p>{product.description}</p>
                    <p>
                        To access comprehensive information, we kindly encourage you to visit the official website of the displayed
                        product. There, you'll find in-depth details, specifications, and more to assist you in making an informed
                        decision.
                    </p>
                </div>
            )}
            {!descriptionVisible && (
                <div className="comment-Section">
                    <div className="comment-Section-inner">
                        {product.comment.map((comment, index) => (
                            <div className="commentbox" key={index}>
                                <h1>{comment.username}</h1>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Start your discussion with other user"
                            rows="5"
                            className="comment-textarea"
                        ></textarea>
                        <button type="submit" onClick={handlePostComment}>Post Comment</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DescriptionBox