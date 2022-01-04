import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import {
    Navbar as NavbarContainer,
    Nav,
    Container,
    Button,
} from "react-bootstrap";

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    return (
        <NavbarContainer bg="light" variant="light" className="mb-5">
            <Container>
                <NavbarContainer.Brand>
                    <Nav.Link as={Link} to="/">
                        <NavbarContainer.Text className="dark">
                            blog
                        </NavbarContainer.Text>
                    </Nav.Link>
                </NavbarContainer.Brand>
                <Nav className="me-auto">
                    {user ? (
                        <>
                            <NavbarContainer.Text>
                                hello, {user.displayName}!
                            </NavbarContainer.Text>
                            <Nav.Link as={Link} to="/blogs/create">
                                create post
                            </Nav.Link>
                            <Nav.Link>
                                <Button
                                    variant="secondary"
                                    className=""
                                    onClick={() => logout()}
                                >
                                    logout
                                </Button>
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Sign Up
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </NavbarContainer>
    );
}
