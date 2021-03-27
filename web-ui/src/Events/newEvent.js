import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import pick from "lodash/pick";
import DateTimePicker from 'react-datetime-picker';

import { create_event } from "../api";


function EventsNew({ session }) {
  let history = useHistory();
  const [event, setEvent] = useState({
    name: "",
    date_time: "2015-01-23P23:50:07",
  });

  function update(field, ev) {
    console.log(ev)
    let u1 = Object.assign({}, event);
    u1[field] = ev.target.value;
    setEvent(u1);
    console.log(event);
  }

  function update_time(ev) {
    console.log(ev);
    let u1 = Object.assign({}, event);
    u1["date_time_iso"] = ev.toISOString();
    u1["full_date"] = ev
    setEvent(u1);
    console.log(event)
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    console.log(event);
    console.log(session)
    event["user_id"] = session.user_id
    console.log(event)
    let new_event = await create_event(event);
    console.log(new_event);
  }

  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("name", ev)}
              value={event.name || ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("description", ev)}
              value={event.description || ""}
            />
          </Form.Group>
          <Form.Group>
            <DateTimePicker onChange={(ev) => update_time(ev)} value={event.full_date}/>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
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

export default connect(state2props)(EventsNew);
