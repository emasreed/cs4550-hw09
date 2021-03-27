import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { create_invite } from "../api";

function InviteNew({ session }) {
  let history = useHistory();
  const [invite, setInvite] = useState({
    email: "",
  });

  function update(field, ev) {
    console.log(ev);
    let u1 = Object.assign({}, invite);
    u1[field] = ev.target.value;
    setInvite(u1);
    console.log(invite);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    let event_id=window.location.href.split("=")[1]
    console.log(event_id)
    console.log(invite)
    let new_invite = await create_invite(invite.email, event_id);
    console.log(new_invite);
  }

  return (
    <Row>
      <Col>
        <h2>New invite</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("email", ev)}
              value={invite.email || ""}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

function state2props({ session }) {
  return { session };
}

export default connect(state2props)(InviteNew);
