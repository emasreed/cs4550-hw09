import store from "./store";

async function api_get(path) {
  let text = await fetch("http://events-spa.ereed.xyz/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let resp = await fetch("http://events-spa.ereed.xyz/api/v1" + path, opts);
  return await resp.json();
}

export function fetch_users() {
  api_get("/users").then((data) => {
    let action = {
      type: "users/set",
      data: data,
    };
    store.dispatch(action);
  });
}

export function fetch_events(user_id) {
  api_get(`/events?user_id=${user_id}`).then((data) => {
    let action = {
      type: "events/set",
      data: data,
    };
    store.dispatch(action);
  });
}

export function fetch_invites(user_id) {
  api_get(`/invites?user_id=${user_id}`).then((data) => {
    let action = {
      type: "invites/set",
      data: data,
    };
    store.dispatch(action);
  });
}

export function fetch_invites_by_event(event_id) {
      api_get(`/invites?event_id=${event_id}`).then((data) => {
        let action = {
          type: "invites/set",
          data: data,
        };
        store.dispatch(action);
      });
}

export function api_login(email, password) {
  api_post("/session", { email, password }).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: "session/set",
        data: data.session,
      };
      store.dispatch(action);
    } else if (data.error) {
      let action = {
        type: "error/set",
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export async function create_event(event) {
  let data = new FormData();
  data.append("event[name]", event.name);
  data.append("event[description]", event.description)
  data.append("event[user_id]", event.user_id)
  data.append("event[date_time_iso]", event.date_time_iso)
  console.log(data)
  let resp = await fetch("http://events-spa.ereed.xyz/api/v1/events", {
    method: "POST",
    // Fetch will handle reading the file object and
    // submitting this as a multipart/form-data request.
    body: data,
  })
    return await resp.json();
}

export async function create_user(user) {
  let data = new FormData();
  data.append("user[photo]", user.photo);
  data.append("user[name]", user.name);
  data.append("user[email]", user.email)
  data.append("user[password]", user.password)
  console.log(data)
  let resp = await fetch("http://events-spa.ereed.xyz/api/v1/users", {
    method: "POST",
    // Fetch will handle reading the file object and
    // submitting this as a multipart/form-data request.
    body: data,
  })
return await resp.json();

}

export async function create_invite(email, event_id) {
  let data = new FormData();
  data.append("email", email);
  data.append("event_id", event_id);
  console.log(data);
  let resp = await fetch("http://events-spa.ereed.xyz/api/v1/invites", {
    method: "POST",
    // Fetch will handle reading the file object and
    // submitting this as a multipart/form-data request.
    body: data,
  });
  return await resp.json();
}

export function load_defaults() {
  fetch_events();
  fetch_users();
}

