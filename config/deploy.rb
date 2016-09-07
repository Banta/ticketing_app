# config valid only for current version of Capistrano
lock '3.4.0'
set :user, 'ubuntu'
set :application, 'ticketing_appx'
set :repo_url, 'git@github.com:Banta/ticketing_app.git'
set :rails_env, 'production'
set :rvm_roles, [:app, :web]
set :rvm_type, :user                     # Defaults to: :auto
set :rvm_ruby_version, '2.3.0@rails'  # Defaults to: 'default'
set :default_stage, 'production'

set :log_level, :debug
set :ssh_options, {forward_agent: true}
set :use_sudo, false

# files we want symlinking to specific entries in shared. Default value for :linked_files is []
set :linked_files, %w{config/database.yml config/application.yml}

# dirs we want symlinking to shared. Default value for linked_dirs is []
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/assets}

# set :default_env, { path: "/opt/ruby/bin:$PATH" }
# set :keep_releases, 5

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end
  after :finishing, 'deploy:cleanup'
end
