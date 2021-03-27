defmodule EventsAppWeb.PageController do
  use EventsAppWeb, :controller

    alias EventsApp.Photos

  def index(conn, _params) do
    events = EventsApp.Events.list_events()
    render(conn, "index.html", events: events)
  end


  def photo(conn, %{"hash" => hash}) do
    {:ok, _name, data} = Photos.load_photo(hash)
    conn
    |> put_resp_content_type("image/jpeg")
    |> send_resp(200, data)
  end
end
