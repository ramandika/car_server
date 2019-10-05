class CreateWatcherMonitored < ActiveRecord::Migration
  def change
    create_table :watcher_monitoreds do |t|
      t.integer :monitored, index: true, foreign_key: true, null: false
      t.integer :watcher, index: true, foreign_key: true, null: false
    end
    add_foreign_key :watcher_monitoreds, :users, column: :monitored
    add_foreign_key :watcher_monitoreds, :users, column: :watcher
  end
end
