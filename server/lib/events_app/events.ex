defmodule EventsApp.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias EventsApp.Repo

  alias EventsApp.Events.Event
  alias EventsApp.Invites.Invite

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
    Repo.all(Event)
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event!(id) do
    Repo.get!(Event, id)
    |> Repo.preload(:user)
  end

  def get_events_for_user(user_id) do
    Repo.all(from(EventsApp.Events.Event, where: [user_id: ^user_id]))
    |> Repo.preload(:user)
  end

  def get_events_for_user_invites(user_id) do
    # query = from p in EventsApp.Events.Event,
    #       preload: [:user],
    #       join: c in EventsApp.Invites.Invite, on: c.event_id == p.id,
    #       select: {p}
    # events_w_invites = Repo.all(from i in query, where: [user_id: ^user_id])
    query = from e in EventsApp.Events.Event, where: e.id in subquery(from(i in EventsApp.Invites.Invite, where: [user_id: ^user_id], select: {i.event_id}))
    Repo.all(query)
    |> Repo.preload(:user)
  end

  def get_event(id) do
    Repo.get!(Event, id)
    |> Repo.preload(:user)
  end

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{data: %Event{}}

  """
  def change_event(%Event{} = event, attrs \\ %{}) do
    Event.changeset(event, attrs)
  end
end
