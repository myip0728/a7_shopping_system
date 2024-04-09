import React, { useState, useEffect, useContext } from 'react'
import './DescriptionBox.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom'

const DescriptionBox = (props) => {
    const navigate = useNavigate();
    const { product } = props;
    const [descriptionVisible, setdescriptionVisible] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(product.comment);
    //if (localStorage.getItem('token')) {
    //    const { username } = useContext(ShopContext);
    //}
    const { username } = useContext(ShopContext);

    useEffect(() => {
        setdescriptionVisible(true);
    }, [product]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handlePostComment = (event) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
            const comment_username = username; // Replace with the actual username
            const New_comment = { username: comment_username, text: newComment };
            setComments([...comments, New_comment]);

            //Post Comment of to server
            fetch('http://localhost:4000/postcomment', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    username: New_comment.username,
                    text: New_comment.text
                }),
            })
                .then((response) => console.log(response))
            navigate(`/product/${product.id}`); //reload the page
            setNewComment('');
        };
    }

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
                        {comments.map((comment, index) => (
                            <div className="commentbox" key={index}>
                                <h1>{comment.username}</h1>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    {localStorage.getItem('token') ?
                        <div className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Start your discussion with other user"
                                rows="5"
                                className="comment-textarea"
                            ></textarea>
                            <button type="submit" onClick={handlePostComment}>Post Comment</button>
                        </div> : null
                    }
                </div>
            )}
        </div>
    )
}
export default DescriptionBox