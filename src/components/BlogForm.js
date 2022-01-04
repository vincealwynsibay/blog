import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore("blogs");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            title,
            content,
            uid: user.uid,
            author: user.displayName,
        });

        setTitle("");
        setContent("");
        navigate(`/blogs/${response.document}`);
    };

    return (
        <div>
            <h3 className="mb-4">Create Blog</h3>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    create
                </Button>
            </form>
        </div>
    );
}
