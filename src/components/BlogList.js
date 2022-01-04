import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BlogList({ blogs }) {
    console.log(blogs);

    return (
        <div>
            {blogs.map((blog) => {
                return (
                    <Card key={blog.id} className="mb-3">
                        <Card.Body>
                            <Card.Title
                                as={Link}
                                style={{
                                    textDecoration: "none",
                                    color: "black",

                                    fontSize: "20px",
                                }}
                                to={`/blogs/${blog.id}`}
                            >
                                {blog.title}
                            </Card.Title>
                            <Card.Text>{blog.content}</Card.Text>
                            <Button
                                variant="primary"
                                as={Link}
                                to={`/blogs/${blog.id}`}
                            >
                                Read More
                            </Button>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}
