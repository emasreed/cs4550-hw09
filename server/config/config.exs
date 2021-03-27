# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :events_app,
  ecto_repos: [EventsApp.Repo],
  mix_env: "#{Mix.env()}"

# Configures the endpoint
config :events_app, EventsAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4CaZTuS/mk5tfxAhXZ6uPyh3/qXcVQU6TIm2yjBGecNUkr0ZM/4GWC2iuJ8cdaO8",
  render_errors: [view: EventsAppWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: EventsApp.PubSub,
  live_view: [signing_salt: "aww7I9v7"]


# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
