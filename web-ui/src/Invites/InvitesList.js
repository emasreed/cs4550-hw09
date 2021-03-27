import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetch_events, fetch_invites, fetch_invites_by_event } from "../api";
import { useEffect, useCallback } from "react";


function InvitesList({ invites, session }) {
  const getinvitesCallback = useCallback(() => {
    let event_id=window.location.href.split("event_id=")
    if (event_id.length > 0){
        event_id=event_id[1]
        fetch_invites_by_event(event_id)
    }else{
        fetch_events(session.user_id)
    }
    console.log(invites);
  });

  useEffect(() => {
    getinvitesCallback();
  }, []);

  let rows = invites.map((invite) => (
    <tr key={invite.id}>
      <td>{invite.user.name}</td>
      <td>{invite.event.name}</td>
      <td>{invite.event.date_time}</td>
      <td>{invite.response}</td>
      <td>{invite.comment}</td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List invites</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Invitee</th>
                <th>Event Name</th>
                <th>Event Date/Time</th>
                <th>Response</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

function state2props({ invites, session }) {
  return { invites, session };
}

export default connect(state2props)(InvitesList);
