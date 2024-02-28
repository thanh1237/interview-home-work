import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { blogActions } from "../redux/actions";

const AddEditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    images: ["http://placeimg.com/400/300", "http://placeimg.com/400/300"],
  });
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const addOrEdit = params.id ? "Edit" : "Add";
  const blogId = params.id;

  useEffect(() => {
    if (blogId) {
      if (!selectedBlog) {
        dispatch(blogActions.getSingleBlog(blogId));
      }
      setFormData((formData) => ({
        ...formData,
        title: selectedBlog.title,
        body: selectedBlog.body,
        images: selectedBlog.images,
        id: blogId,
      }));
    }
  }, [blogId, selectedBlog, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addOrEdit === "Add") {
      await dispatch(blogActions.addNewPost(formData));
    } else if (addOrEdit === "Edit") {
      await dispatch(blogActions.updatePost(formData));
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    await dispatch(blogActions.deleteBlog(params.id));
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} blog</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Body"
                name="body"
                value={formData.body}
                onChange={handleChange}
              />
            </Form.Group>

            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button
                  className="mr-3"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="primary">
                  Submit
                </Button>
              )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Blog
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditBlogPage;
