defmodule EventsApp.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date_time, :naive_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, EventsApp.Users.User
    has_many :invites, EventsApp.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :description, :date_time, :user_id])
    |> validate_required([:name, :description, :date_time, :user_id])
  end
end
