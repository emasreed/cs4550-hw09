defmodule EventsAppWeb.InviteView do
  use EventsAppWeb, :view
  alias EventsAppWeb.EventView
  alias EventsAppWeb.InviteView
  alias EventsAppWeb.UserView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      response: invite.response,
      comment: invite.comment,
      user: render_one(invite.user, UserView, "user.json"),
      event: render_one(invite.event, EventView, "event_shallow.json")
    }
  end

end
