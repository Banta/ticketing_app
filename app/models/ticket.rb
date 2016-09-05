class Ticket < ActiveRecord::Base

  # Associations
  belongs_to :user

  # Enums
  enum status: [:pending, :resolved, :canceled]

  # Callbacks
  after_initialize :set_defaults, if: :new_record?

  # Validations
  validates_presence_of :title, :desc


  def closed_time
    cloased_at.strftime("%b %d, %Y %H:%M") if cloased_at
  end


  private
  def set_defaults
    self.status ||= :pending
  end
end
