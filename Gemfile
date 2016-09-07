source 'https://rubygems.org'

ruby '2.3.0'
gem 'rails', '4.2.5.2'
gem 'mysql2', '>= 0.3.13', '< 0.5'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'bootstrap-sass'
gem 'devise' # Authentication gem
gem 'sendgrid' # Send email using sendgrid
gem 'figaro' # Manages application.yml configurations file
gem 'premailer-rails' # Gem for compiling html template emails
gem 'nokogiri'
gem 'prawn'
gem 'prawn-table'

gem 'rails_12factor', group: :production

group :development do
  gem 'web-console', '~> 2.0' # Access an IRB console on exception pages
  gem 'spring' # Spring speeds up development

  gem 'capistrano', '~> 3.4.0'
  gem 'capistrano-bundler'
  gem 'capistrano-rails', '~> 1.1.0'
  gem 'capistrano-rails-console'
  gem 'capistrano-rvm', '~> 0.1.1'
end

group :development, :test do
  gem 'byebug'
  gem 'factory_girl_rails'
  gem 'ffaker'
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
end
