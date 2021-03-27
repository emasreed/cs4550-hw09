defmodule EventsAppWeb.EventController do
  use EventsAppWeb, :controller

  alias EventsApp.Events
  alias EventsApp.Events.Event
  alias EventsApp.Users.User

  action_fallback EventsAppWeb.FallbackController

  def index(conn, %{"user_id" => user_id}) do
    events = Events.get_events_for_user(user_id)
    events_invites = Events.get_events_for_user_invites(user_id)
    render(conn, "index.json", events: events ++ events_invites)
  end

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    date = event_params["date_time_iso"]
    {:ok, date_time} = NaiveDateTime.from_iso8601(date)
    event_params = event_params
    |> Map.put("date_time", date_time)
    IO.puts NaiveDateTime.to_string(event_params["date_time"])
    case Events.create_event(event_params) do
      {:ok, event} ->
        conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.event_path(conn, :show, event))
          |> render("show.json", event: Events.get_event(event.id))
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
