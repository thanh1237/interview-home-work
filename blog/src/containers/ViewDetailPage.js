import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import CommentList from "./CommentList";
import { useParams, useNavigate } from "react-router-dom";
import { blogActions } from "../redux/actions/blog.actions";
import { commentActions } from "../redux/actions";

function ViewDetailPage() {
  const loading = useSelector((state) => state.blog.loading);
  const blog = useSelector((state) => state.blog.selectedBlog);
  const comments = useSelector((state) => state.comment.comments);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBackClick = () => {
    navigate("/");
  };
  const handleEdit = () => {
    navigate(`/add-edit/${params.id}`);
  };
  useEffect(() => {
    if (params?.id) {
      dispatch(blogActions.getSingleBlog(params.id));
      dispatch(commentActions.commentsRequest(params.id));
    }
  }, [dispatch, params]);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>

        <Button variant="primary" onClick={handleEdit}>
          <FontAwesomeIcon icon="edit" size="1x" /> Edit
        </Button>
      </div>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </div>
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h4>{blog.title}</h4>
              <span className="text-muted">
                @{blog?.userId} wrote <Moment fromNow>{blog.createdAt}</Moment>
              </span>

              <hr />
              <div>{blog.body}</div>
              <hr />
              <h3>Comments:</h3>
              <CommentList comments={comments} />
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default ViewDetailPage;
