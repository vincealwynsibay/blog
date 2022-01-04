import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Form, Button } from "react-bootstrap";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isPending } = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password);

        setPassword("");
    };

    return (
        <div className="">
            <h3 className="mb-4">Login</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </Form.Group>
                {error && <p className="danger">{error}</p>}
                {isPending ? (
                    <Button variant="primary" type="submit" disabled>
                        loading
                    </Button>
                ) : (
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                )}
            </Form>
        </div>
    );
}
