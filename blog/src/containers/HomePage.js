import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../redux/actions/blog.actions";
import PaginationBar from "../components/PaginationBar";
import { ClipLoader } from "react-spinners";
import {
  Col,
  Row,
  Button,
  Container,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const [formData, setFormData] = useState({
    title: "",
  });

  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum, 10, undefined));
  }, [dispatch, pageNum]);

  const handleClickOnBlog = (blog) => {
    navigate(`/blog-detail/${blog.id}`);
  };

  const handleShow = () => {
    navigate(`/add-edit`);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(blogActions.blogsRequest(pageNum, 10, formData.title));
  };

  const handleRest = (e) => {
    e.preventDefault();
    setFormData({
      title: "",
    });
    dispatch(blogActions.blogsRequest(pageNum, 10, undefined));
  };

  return (
    <Container>
      <div className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <ButtonGroup style={{ marginTop: "10px" }} className="d-flex mb-3">
          {loading ? (
            <Button className="mr-3" variant="primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Searching...
            </Button>
          ) : (
            <Button className="mr-3" type="submit" variant="primary">
              Search Post
            </Button>
          )}
          <Button variant="light" onClick={handleRest} disabled={loading}>
            Reset
          </Button>
        </ButtonGroup>
      </Form>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Add new
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </div>
      ) : (
        <div>
          {blogs?.length ? (
            <>
              <Row>
                {blogs.map((blog, idx) => (
                  <Col sm={12} md={4} lg={3} key={idx}>
                    <BlogCard
                      blog={blog}
                      key={blog.id}
                      handleClick={() => handleClickOnBlog(blog)}
                    />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p>There are no blogs</p>
          )}
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </div>
      )}
    </Container>
  );
};

export default HomePage;
