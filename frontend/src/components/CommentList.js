import React from 'react';

const getTotalComments = (results) => {
    return results.reduce((acc, result) => {
        const repliesCount = result.replies ? result.replies.length : 0;
        return acc + 1 + repliesCount;
    }, 0);
};

const CommentList = ({ results }) => (
    <>
        <p>{getTotalComments(results)} comments</p>
        <ul>
            {results.length === 0 ? (
                <p>No comments found</p>
            ) : (
                results.map((result, index) => (
                    <li className='comment' key={index}>
                        <p className='username'>{result.username}</p>
                        <p className='comment_text'>{result.comment}</p>
                        <p>&nbsp;<span className='likes'><i className="fa-solid fa-thumbs-up"></i></span> {result.likes}</p>
                        {result.replies && result.replies.length > 0 && (
                            <ul>
                                {result.replies.map((reply, replyIndex) => (
                                    <li className="replies" key={replyIndex}>
                                        <p className='username'>{reply.username}</p>
                                        <p className='comment_text'>{reply.comment}</p>
                                        <p >&nbsp;<span className='likes'><i className="fa-solid fa-thumbs-up"></i></span> {reply.likes}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))
            )}
        </ul>
    </>
);

export default CommentList;
