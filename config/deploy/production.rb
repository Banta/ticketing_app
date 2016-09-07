# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

set :deploy_to, '/var/www/lab/ticketing_appx'
set :branch, 'master'
set :rails_env, 'production'

role :app, %w{ubuntu@192.241.248.97}
role :web, %w{ubuntu@192.241.248.97}
role :db,  %w{ubuntu@192.241.248.97}
