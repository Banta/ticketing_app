class Ticket < ActiveRecord::Base

  # Associations
  belongs_to :user

  # Enums
  enum status: [:pending, :resolved, :canceled]

  # Callbacks

  # Validations
end
