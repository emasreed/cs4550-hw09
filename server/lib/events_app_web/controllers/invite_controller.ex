defmodule EventsAppWeb.InviteController do
  use EventsAppWeb, :controller

  alias EventsApp.Invites
  alias EventsApp.Invites.Invite
  alias EventsApp.Photos

  action_fallback EventsAppWeb.FallbackController

  def index(conn, %{"event_id" => event_id}) do
    invites = Invites.list_invites_by_event(event_id)
    render(conn, "index.json", invites: invites)
  end

  def index(conn, %{"user_id" => user_id}) do
    invites = Invites.list_invites_by_user(user_id)
    render(conn, "index.json", invites: invites)
  end

  def index(conn, _params) do
    IO.puts "Called Index"
    invites = Invites.list_invites()
    render(conn, "index.json", invites: invites)
  end

  def create(conn, %{"email" => email, "event_id" => event_id}) do
    IO.puts email
    user = if EventsApp.Users.get_user_by_email(email) == nil do
      IO.puts "User does not exist yet"
      photos = Application.app_dir(:events_app, "priv/photos")
      path = Path.join(photos, "imdying.jfif")
      {:ok, hash} = Photos.save_photo("imdying.jfif", path)
      user_params = %{name: "not_registered", email: email, photo_hash: hash, password_hash: Argon2.hash_pwd_salt("password123")}
      {:ok, user} = EventsApp.Users.create_user(user_params)
      IO.puts "USER CREATED"
      IO.puts user.id
      user
    else
      IO.puts "USER EXISTS"
      EventsApp.Users.get_user_by_email(email)
    end
    IO.puts user.id
    invite_params = %{user_id: user.id, event_id: event_id, comment: "comment", response: "no response"}

    case Invites.create_invite(invite_params) do
      {:ok, invite} ->
        conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
          |> render("show.json", invite: Invites.get_invite!(invite.id))
    end
  end



  def create(conn, %{"invite" => invite_params}) do
    with {:ok, %Invite{} = invite} <- Invites.create_invite(invite_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
      |> render("show.json", invite: invite)
    end
  end

  def show(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)
    render(conn, "show.json", invite: invite)
  end

  def update(conn, %{"id" => id, "invite" => invite_params}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def delete(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{}} <- Invites.delete_invite(invite) do
      send_resp(conn, :no_content, "")
    end
  end
end
