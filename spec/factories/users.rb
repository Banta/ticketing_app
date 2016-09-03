FactoryGirl.define do
  factory :user do
    confirmed_at Time.now
    name "Test User"
    email { Faker::Internet.email }
    password "please123"
    auth_token "auniquetoken123"
  end
end
