class User < ApplicationRecord
validates :cookie, :ball, :count, presence: true
end
