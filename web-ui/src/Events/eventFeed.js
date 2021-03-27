import { Row, Col, Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetch_events, fetch_users } from "../api";
import { useEffect, useCallback } from "react";

function photo_path(event) {
    console.log(event)
  return "http://events-spa.ereed.xyz/photos/" + event.user.photo_hash;
}

function Feed({events, session}) {
  const getEventsCallback = useCallback(() => {
    fetch_events(session.user_id);
  });

  useEffect(() => {
    getEventsCallback();
  }, []);

  function owns_event(event){
    if(event.user.id == session.user_id){
      return <Link to={`/invites/new?event_id=${event.id}`}>New invite</Link>;
    }else {
      return <p>No Links Avaliable</p>
    }
  }

  let rows = events.map((event) => (
    <tr key={event.id}>
      <td>{event.name}</td>
      <td>{event.description}</td>
      <td>{event.date_time}</td>
      <td>{event.user.name}</td>
      <td>
        <Image src={photo_path(event)} className="userIcon" />
      </td>
      <td>
        {owns_event(event)}
        <br />
        <Link to={`/invites?event_id=${event.id}`}>See Invites</Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>Events</h2>
          <p>
            <Link to="/events/new">New Event</Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Event DateTime</th>
                <th>Event Owner</th>
                <th>Event Owner Icon</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}


export default connect(({events, session}) => ({events, session}))(Feed);
