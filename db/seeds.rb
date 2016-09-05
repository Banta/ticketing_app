# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


puts 'Create admin user'
admin = User.find_or_create_by(email: Figaro.env.admin_email) do |admin|
  admin.password = Figaro.env.admin_password
  admin.role = :admin
  if admin.save
    puts "==========> Admin #{admin.email} created\n\n\n"
  end
end


puts 'Create agent user'
agent = User.find_or_create_by(email: Figaro.env.agent_email) do |agent|
  agent.password = Figaro.env.agent_password
  agent.role = :agent
  if agent.save
    puts "==========> Agent #{agent.email} created"
  end
end
