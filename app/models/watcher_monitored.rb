class WatcherMonitored < ActiveRecord::Base
  belongs_to :users, foreign_key: :monitored
  belongs_to :users, foreign_key: :watcher
end