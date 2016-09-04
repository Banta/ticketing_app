class Ticket < ActiveRecord::Base

  # Associations
  belongs_to :user

  # Enums
  enum status: [:pending, :resolved, :canceled]

  # Callbacks
  after_initialize :set_defaults, if: :new_record?

  # Validations
  validates_presence_of :title, :desc


  private
  def set_defaults
    self.status ||= :pending
  end
end
