#!/bin/bash
cd /Users/chicken/Downloads/stevens-transport-app
exec /opt/homebrew/bin/node node_modules/.bin/next dev -H 0.0.0.0 -p 3001 --turbopack
