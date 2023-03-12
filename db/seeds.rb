# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding..."

User.create([
  {username: "admin", password: "admin", password_confirmation: "admin"},
  {username: "test", password: "test", password_confirmation: "test"}
])

Trip.create([
  {user_id: 1, name: "Alaska Trip", plan: false, published: false, notes: "Hoping to go on this one."},
  {user_id: 1, name: "Mexico Trip", plan: true, published: false, notes: "This is my second choice.."},
  {user_id: 2, name: "Europe Trip", plan: true, published: true, notes: "Would love to explore Europe!"},
  {user_id: 1, name: "Alaska Trip", plan: false, published: false, notes: "Hoping to go on this one."},
  {user_id: 1, name: "Mexico Trip", plan: true, published: false, notes: "This is my second choice.."},
  {user_id: 2, name: "Europe Trip", plan: true, published: true, notes: "Would love to explore Europe!"},
  {user_id: 2, name: "italy", plan: false, published: nil, notes: nil}
])

City.create([
  {city: "Juneau", country: "United States", trip_id: 1},
  {city: "Fairbanks", country: "United States", trip_id: 1},
  {city: "Anchorage", country: "United States", trip_id: 1},
  {city: "Mexico City", country: "Mexico", trip_id: 2},
  {city: "Cancun", country: "Mexico", trip_id: 2},
  {city: "Puerto Vallarta", country: "Mexico", trip_id: 2},
  {city: "Amsterdam", country: "Netherlands", trip_id: 3},
  {city: "Brussels", country: "Belgium", trip_id: 3},
  {city: "Paris", country: "France", trip_id: 3},
  {city: "milan", country: "italy", trip_id: 7},
  {city: "palermo", country: "italy", trip_id: 7},
  {city: "rome", country: "italy", trip_id: 7}
])

Tag.create([
  {name: "skiing"},
  {name: "snowboarding"},
  {name: "snowmobiling"},
  {name: "surfing"},
  {name: "beach"},
  {name: "fishing"},
  {name: "visiting ruins"},
  {name: "climbing"},
  {name: "snorkeling"},
  {name: "visiting friends"},
  {name: "backpacking"},
  {name: "skydiving"},
  {name: "foodie"},
  {name: "sunbathing"}
])

TripTag.create([
  {trip_id: 1, tag_id: 1},
  {trip_id: 1, tag_id: 2},
  {trip_id: 1, tag_id: 3},
  {trip_id: 2, tag_id: 4},
  {trip_id: 2, tag_id: 7},
  {trip_id: 2, tag_id: 6},
  {trip_id: 3, tag_id: 10},
  {trip_id: 3, tag_id: 11},
  {trip_id: 3, tag_id: 13}
])

Accommodation.create!([
  {city_id: 10, start_datetime: "2023-03-22 13:57:00", end_datetime: "2023-03-24 13:57:00", cost: 400.0, description: "hotel"},
  {city_id: 11, start_datetime: "2023-03-24 14:00:00", end_datetime: "2023-03-26 14:00:00", cost: 0.0, description: "friend's house"}
])

Activity.create!([
  {description: "museum", city_id: 10, start_datetime: "2023-03-23 13:56:00", end_datetime: "2023-03-23 13:56:00", cost: 100.0}
])

Transportation.create!([
  {start_location_id: 10, start_datetime: "2023-03-24 13:55:00", end_location_id: 11, end_datetime: "2023-03-24 13:55:00", cost: 200.0, description: "flight"},
  {start_location_id: 11, start_datetime: "2023-03-26 13:56:00", end_location_id: 12, end_datetime: "2023-03-26 13:56:00", cost: 300.0, description: "flight"}
])

puts "Seeding complete!"