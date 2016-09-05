class AddClosedAtToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :closed_at, :datetime
  end
end
