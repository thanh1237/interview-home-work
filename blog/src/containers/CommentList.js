import React from "react";
import Moment from "react-moment";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 && (
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <CommentContent key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </>
  );
};

const CommentContent = ({ comment }) => {
  return (
    <div className="comment">
      <span className="comment_body">{comment?.body}</span>
      <br />
      <span className="comment_by">posted by </span>
      <span className="comment_author">{comment?.name}</span>
      <span className="comment_on"> on </span>
      <span className="comment_date">
        <Moment fromNow>{comment?.createdAt}</Moment>
      </span>
    </div>
  );
};

export default CommentList;
