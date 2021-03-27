#!/bin/bash

export SECRET_KEY_BASE=W68eso5YQOlbtvSNUR50N/HDWj6IaEhAwMR3LtzuBEQAefwYVbX84bvoTA7XtiGi
export MIX_ENV=prod
export PORT=4798

echo "Stopping old copy of app, if any..."

_build/prod/rel/events_app/bin/events_app stop || true

CFGD=$(readlink -f ~/.config/events)

if [ ! -e "$CFGD/base" ]; then
    echo "run build first"
    exit 1
fi

echo "Starting app..."

_build/prod/rel/events_app/bin/events_app start
