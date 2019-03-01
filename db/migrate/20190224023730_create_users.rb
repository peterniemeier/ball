class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :cookie, null: false
      t.integer :ball, null: false
      t.integer :count, null: false
      t.timestamps
    end
    add_index :users, :cookie, unique: true
  end
end
