import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog, handleClick }) => {
  let time = moment();
  return (
    <Card
      onClick={() => handleClick(blog)}
      style={{
        height: "500px",
        marginBottom: "20px",
      }}
    >
      <Card.Img
        variant="top"
        src={
          blog?.images?.length
            ? blog.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          {blog.body?.length <= 99 ? blog.body : blog.body.slice(0, 99) + "..."}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{blog.userId} wrote <Moment fromNow>{time}</Moment>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
