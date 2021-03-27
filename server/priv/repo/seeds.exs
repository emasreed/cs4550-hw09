# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsApp.Repo.insert!(%EventsApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias EventsApp.Repo
alias EventsApp.Users.User
alias EventsApp.Events.Event
alias EventsApp.Photos
alias EventsApp.Invites.Invite

defmodule Inject do
  def photo(name) do
    photos = Application.app_dir(:events_app, "priv/photos")
    path = Path.join(photos, name)
    {:ok, hash} = Photos.save_photo(name, path)
    hash
  end

  def user(name, pass, email, photo_hash) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, photo_hash: photo_hash, password_hash: hash})
  end
end

binky = Inject.photo("binky.jfif")
clare = Inject.photo("clare.jfif")

alice = Inject.user("alice", "test1", "alice@email.com", clare)
bob = Inject.user("bob", "test2", "bob@email.com", binky)

alice_meeting = Repo.insert!(%Event{user_id: alice.id, name: "Alice Meeting", description: "Alice says Hi!", date_time: ~N[2022-01-01 23:00:07]})
Repo.insert!(%Event{user_id: bob.id, name: "Bob Birthday", description: "Bob says garblarg!", date_time: ~N[2021-05-01 23:00:07]})

Repo.insert!(%Invite{event_id: alice_meeting.id, user_id: bob.id, comment: "Sounds fun!", response: "I'll be there"})
