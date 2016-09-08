class Ticket < ActiveRecord::Base

  # Associations
  belongs_to :user

  # Enums
  enum status: [:pending, :approved, :closed]

  # Callbacks
  after_initialize :set_defaults, if: :new_record?
  before_save :check_if_closed

  # Validations
  validates_presence_of :title, :desc


  def closed_time
    closed_at.strftime("%b %d, %Y %H:%M") if closed_at
  end


  private
  def set_defaults
    self.status ||= :pending
  end

  def check_if_closed
    if closed?
      self.closed_at = Time.now.utc
    end
  end
end
