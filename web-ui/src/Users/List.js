import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetch_events, fetch_users } from "../api";
import { useEffect, useCallback } from "react";

function UsersList({ users }) {
  const getUsersCallback = useCallback(() => {
    fetch_users();
  });

  useEffect(() => {
    getUsersCallback();
  }, []);

  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>[Edit]</td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Users</h2>
          <p>
            <Link to="/users/new">New User</Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

function state2props({ users }) {
  return { users };
}

export default connect(state2props)(UsersList);
