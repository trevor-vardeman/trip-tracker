# puts "Seeding..."

# User.create!([
#   {username: "admin", password: "admin", password_confirmation: "admin"},
#   {username: "trevor", password: "trevor", password_confirmation: "trevor"}
# ])
# Trip.create!([
#   {user_id: 1, name: "Alaska Trip", plan: false, published: false, notes: "Hoping to go on this one."},
#   {user_id: 1, name: "Mexico Trip", plan: true, published: false, notes: "This is my second choice.."},
#   {user_id: 2, name: "Europe Trip", plan: true, published: true, notes: "Would love to explore Europe!"},
#   {user_id: 1, name: "Alaska Trip", plan: false, published: false, notes: "Hoping to go on this one."},
#   {user_id: 1, name: "Mexico Trip", plan: true, published: false, notes: "This is my second choice.."},
#   {user_id: 2, name: "Europe Trip", plan: true, published: true, notes: "Would love to explore Europe!"},
#   {user_id: 2, name: "italy", plan: false, published: nil, notes: nil},
#   {user_id: 2, name: "australia", plan: false, published: nil, notes: nil},
#   {user_id: 2, name: "Canada", plan: true, published: nil, notes: nil}
# ])
# City.create!([
#   {city: "Juneau", country: "United States", trip_id: 1},
#   {city: "Fairbanks", country: "United States", trip_id: 1},
#   {city: "Anchorage", country: "United States", trip_id: 1},
#   {city: "Mexico City", country: "Mexico", trip_id: 2},
#   {city: "Cancun", country: "Mexico", trip_id: 2},
#   {city: "Puerto Vallarta", country: "Mexico", trip_id: 2},
#   {city: "Amsterdam", country: "Netherlands", trip_id: 3},
#   {city: "Brussels", country: "Belgium", trip_id: 3},
#   {city: "Paris", country: "France", trip_id: 3},
#   {city: "milan", country: "italy", trip_id: 7},
#   {city: "palermo", country: "italy", trip_id: 7},
#   {city: "rome", country: "italy", trip_id: 7},
#   {city: "melbourne", country: "au", trip_id: 8},
#   {city: "sydney", country: "au", trip_id: 8},
#   {city: "cairns", country: "au", trip_id: 8},
#   {city: "airlie beach", country: "au", trip_id: 8},
#   {city: "daydream island", country: "au", trip_id: 8},
#   {city: "san francisco", country: "usa", trip_id: 9},
#   {city: "vancouver", country: "ca", trip_id: 9},
#   {city: "calgary", country: "ca", trip_id: 9},
#   {city: "toronto", country: "ca", trip_id: 9},
#   {city: "san francisco", country: "usa", trip_id: 9}
# ])
# Accommodation.create!([
#   {city_id: 10, start_datetime: "2023-03-22 13:57:00", end_datetime: "2023-03-24 13:57:00", cost: 400.0, description: "hotel"},
#   {city_id: 11, start_datetime: "2023-03-24 14:00:00", end_datetime: "2023-03-26 14:00:00", cost: 0.0, description: "friend's house"},
#   {city_id: 20, start_datetime: "2023-03-03 22:00:00", end_datetime: "2023-03-04 07:00:00", cost: 150.0, description: "hotel"},
#   {city_id: 21, start_datetime: "2023-03-04 20:00:00", end_datetime: "2023-03-06 09:00:00", cost: 150.0, description: "hostel"},
#   {city_id: 22, start_datetime: "2023-03-06 17:00:00", end_datetime: "2023-03-08 09:00:00", cost: 0.0, description: "friend's house"}
# ])
# Activity.create!([
#   {description: "museum", city_id: 10, start_datetime: "2023-03-23 13:56:00", end_datetime: "2023-03-23 13:56:00", cost: 100.0},
#   {description: "city tour", city_id: 13, start_datetime: "2023-03-10 14:24:00", end_datetime: "2023-03-10 14:24:00", cost: 100.0},
#   {description: "museum", city_id: 20, start_datetime: "2023-03-04 09:00:00", end_datetime: "2023-03-04 12:00:00", cost: 50.0},
#   {description: "calgary flames game", city_id: 21, start_datetime: "2023-03-05 19:00:00", end_datetime: "2023-03-05 22:00:00", cost: 100.0},
#   {description: "toronto blue jays game", city_id: 22, start_datetime: "2023-03-07 12:00:00", end_datetime: "2023-03-07 15:00:00", cost: 100.0}
# ])
# Tag.create!([
#   {name: "skiing"},
#   {name: "snowboarding"},
#   {name: "snowmobiling"},
#   {name: "surfing"},
#   {name: "beach"},
#   {name: "fishing"},
#   {name: "visiting ruins"},
#   {name: "climbing"},
#   {name: "snorkeling"},
#   {name: "visiting friends"},
#   {name: "backpacking"},
#   {name: "skydiving"},
#   {name: "foodie"},
#   {name: "sunbathing"},
#   {name: "scuba diving"}
# ])
# Transportation.create!([
#   {start_location_id: 10, start_datetime: "2023-03-24 13:55:00", end_location_id: 11, end_datetime: "2023-03-24 13:55:00", cost: 200.0, description: "flight"},
#   {start_location_id: 11, start_datetime: "2023-03-26 13:56:00", end_location_id: 12, end_datetime: "2023-03-26 13:56:00", cost: 300.0, description: "flight"},
#   {start_location_id: 18, start_datetime: "2023-03-03 19:10:00", end_location_id: 19, end_datetime: "2023-03-03 21:10:00", cost: 500.0, description: "flight - alaska airlines"},
#   {start_location_id: 19, start_datetime: "2023-03-04 16:00:00", end_location_id: 20, end_datetime: "2023-03-04 19:00:00", cost: 250.0, description: "flight - air canada"},
#   {start_location_id: 20, start_datetime: "2023-03-06 12:00:00", end_location_id: 21, end_datetime: "2023-03-06 15:00:00", cost: 250.0, description: "flight - air canada"},
#   {start_location_id: 21, start_datetime: "2023-03-08 12:00:00", end_location_id: 22, end_datetime: "2023-03-08 15:30:00", cost: 400.0, description: "flight home - alaska airlines"}
# ])
# TripTag.create!([
#   {trip_id: 1, tag_id: 1},
#   {trip_id: 1, tag_id: 2},
#   {trip_id: 1, tag_id: 3},
#   {trip_id: 2, tag_id: 4},
#   {trip_id: 2, tag_id: 7},
#   {trip_id: 2, tag_id: 6},
#   {trip_id: 3, tag_id: 10},
#   {trip_id: 3, tag_id: 11},
#   {trip_id: 3, tag_id: 13},
#   {trip_id: 8, tag_id: 15},
#   {trip_id: 8, tag_id: 5},
#   {trip_id: 8, tag_id: 6},
#   {trip_id: 8, tag_id: 9},
#   {trip_id: 8, tag_id: 13},
#   {trip_id: 8, tag_id: 11},
#   {trip_id: 9, tag_id: 13},
#   {trip_id: 9, tag_id: 2},
#   {trip_id: 9, tag_id: 3},
#   {trip_id: 9, tag_id: 10}
# ])

# puts "Seeding Complete!"