class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :desc
      t.integer :status
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
