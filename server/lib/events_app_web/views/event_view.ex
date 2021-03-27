defmodule EventsAppWeb.EventView do
  use EventsAppWeb, :view
  alias EventsAppWeb.EventView
  alias EventsAppWeb.UserView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      name: event.name,
      description: event.description,
      date_time: event.date_time,
      user: render_one(event.user, UserView, "user.json"),
    }
  end

  def render("event_shallow.json", %{event: event}) do
    %{id: event.id,
      name: event.name,
      description: event.description,
      date_time: event.date_time,
    }
  end
end
