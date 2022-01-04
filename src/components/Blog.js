import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { Card, Button } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Blog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const {
        getBlog,
        deleteDocument,
        response: response,
    } = useFirestore("blogs");

    useEffect(() => {
        const fetchData = async () => {
            await getBlog(id);
        };

        fetchData();
    }, [id]);

    let blog = response.document;

    return (
        <>
            {blog !== null && (
                <div>
                    <Card key={blog.id} className="mb-3">
                        <Card.Body>
                            <Card.Title
                                style={{
                                    textDecoration: "none",
                                    color: "black",

                                    fontSize: "30px",
                                }}
                            >
                                {blog.title}
                            </Card.Title>
                            <Card.Text className="muted">
                                by {blog.author}
                            </Card.Text>
                            <Card.Text
                                style={{
                                    textDecoration: "none",
                                    color: "black",

                                    fontSize: "15px",
                                }}
                            >
                                {blog.content}
                            </Card.Text>
                            {user.uid === blog.uid && (
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        deleteDocument(blog.id);
                                        navigate("/");
                                    }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                    );
                </div>
            )}
        </>
    );
}
