import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import pick from "lodash/pick";

import { create_user, fetch_users } from "../api";

function UsersNew() {
  let history = useHistory();
  const [user, setUser] = useState({ name: "", pass1: "", pass2: "" });

  function check_pass(p1, p2) {
    if (p1 !== p2) {
      return "Passwords don't match.";
    }

    if (p1.length < 8) {
      return "Password too short.";
    }

    return "";
  }

  function update(field, ev) {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    u1.pass_msg = check_pass(u1.pass1, u1.pass2);
    setUser(u1);
    console.log(user)
  }

  function updatePhoto(ev) {
    let p1 = Object.assign({}, user);
    p1["photo"] = ev.target.files[0];
    setUser(p1);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    console.log(user);
    // let data = pick(user, ["name", "password", "email", "photo"]);
    let new_user = await create_user(user)
    console.log(new_user);
  }

  return (
    <Row>
      <Col>
        <h2>New User</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("name", ev)}
              value={user.name || ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("email", ev)}
              value={user.email || ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" onChange={updatePhoto} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => update("pass1", ev)}
              value={user.pass1 || ""}
            />
            <p>{user.pass_msg}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => update("pass2", ev)}
              value={user.pass2 || ""}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={user.pass_msg !== ""}
          >
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

function state2props() {
  return {};
}

export default connect(state2props)(UsersNew);
