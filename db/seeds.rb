# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding..."

User.create({username: "admin", password: "admin", password_confirmation: "admin"})
test = User.create({username: "test", password: "test", password_confirmation: "test"})
test.avatar.attach(
  io: File.open('./public/avatars/user.png'),
  filename: 'user.png',
  content_type: 'application/png'
)


Trip.create({user_id: 1, name: "Alaska Trip", plan: false, published: false, notes: "Hoping to go on this one."})
Trip.create({user_id: 1, name: "Mexico Trip", plan: true, published: false, notes: "This is my second choice.."})
Trip.create({user_id: 2, name: "Europe Trip", plan: true, published: true, notes: "Would love to explore Europe!"})

City.create({city: "Juneau", country: "United States", trip_id: 1})
City.create({city: "Fairbanks", country: "United States", trip_id: 1})
City.create({city: "Anchorage", country: "United States", trip_id: 1})
City.create({city: "Mexico City", country: "Mexico", trip_id: 2})
City.create({city: "Cancun", country: "Mexico", trip_id: 2})
City.create({city: "Puerto Vallarta", country: "Mexico", trip_id: 2})
City.create({city: "Amsterdam", country: "Netherlands", trip_id: 3})
City.create({city: "Brussels", country: "Belgium", trip_id: 3})
City.create({city: "Paris", country: "France", trip_id: 3})

Tag.create({name: "skiing"})
Tag.create({name: "snowboarding"})
Tag.create({name: "snowmobiling"})
Tag.create({name: "surfing"})
Tag.create({name: "beach"})
Tag.create({name: "fishing"})
Tag.create({name: "visiting ruins"})
Tag.create({name: "climbing"})
Tag.create({name: "snorkeling"})
Tag.create({name: "visiting friends"})
Tag.create({name: "backpacking"})
Tag.create({name: "skydiving"})
Tag.create({name: "foodie"})

TripTag.create({trip_id: 1, tag_id: 1})
TripTag.create({trip_id: 1, tag_id: 2})
TripTag.create({trip_id: 1, tag_id: 3})
TripTag.create({trip_id: 2, tag_id: 4})
TripTag.create({trip_id: 2, tag_id: 7})
TripTag.create({trip_id: 2, tag_id: 6})
TripTag.create({trip_id: 3, tag_id: 10})
TripTag.create({trip_id: 3, tag_id: 11})
TripTag.create({trip_id: 3, tag_id: 13})

puts "Seeding complete!"