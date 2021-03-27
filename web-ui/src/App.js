import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Feed from "./Events/eventFeed";
import "./App.scss";
import UsersList from "./Users/List";
import UsersNew from "./Users/New";
import Nav from "./Nav";
import EventsNew from "./Events/newEvent";
import InvitesList from "./Invites/InvitesList";
import InviteNew from "./Invites/newInvite"
import NotLoggedIn from "./notLoggedIn"

function App({session}) {
  let body = (
    <Switch>
      <Route path="/" exact>
        <NotLoggedIn />
      </Route>
      <Route path="/users" exact>
        <UsersList />
      </Route>
      <Route path="/users/new">
        <UsersNew />
      </Route>
      <Route path="/events/new">
        <NotLoggedIn />
      </Route>
      <Route path="/invites" exact>
        <NotLoggedIn />
      </Route>
      <Route path="/invites/new">
        <NotLoggedIn />
      </Route>
    </Switch>
  );
  if (session){
    body = (
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
        <Route path="/events/new">
          <EventsNew />
        </Route>
        <Route path="/invites" exact>
          <InvitesList />
        </Route>
        <Route path="/invites/new">
          <InviteNew />
        </Route>
      </Switch>
    );
  }
  
  return (
    <Container>
      <Nav />
      {body}
    </Container>
  );
}

export default connect(({ session }) => ({ session }))(App);
