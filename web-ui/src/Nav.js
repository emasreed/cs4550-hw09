import { Nav, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

import { api_login } from "./api";
import store from "./store";

function LoginForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(name, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control
        name="name"
        type="text"
        onChange={(ev) => setName(ev.target.value)}
        value={name}
      />
      <Form.Control
        name="password"
        type="password"
        onChange={(ev) => setPass(ev.target.value)}
        value={pass}
      />
      <Link to="/users/new">Users</Link>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

function SessionInfo({ session }) {
  function logout(ev) {
    ev.preventDefault();
    store.dispatch({ type: "session/clear" });
  }

  return (
    <p>
      Logged in as {session.name}
      <Button onClick={logout}>Logout</Button>
    </p>
  );
}

function LOI({ session }) {
  if (session) {
    return <SessionInfo session={session} />;
  } else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(({ session }) => ({ session }))(LOI);

function Link({ to, children }) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}

function AppNav({ error }) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">My Events</Link>
            <Link to="/users">Users</Link>
            <Link to="/invites">My Invites</Link>
          </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      {error_row}
    </div>
  );
}

export default connect(({ error }) => ({ error }))(AppNav);
