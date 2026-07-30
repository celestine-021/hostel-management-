Table users {
  user_id integer pk
  username integer unique
  password varchar 
  role text 
}

Table profiles  {
  profile_id integer pk
  user_id integer unique
  full_name varchar
  phone_number integer
  registration_number integer
  course text
  year_of_study integer
}

Table hostels {
  hostel_id integer pk
  name varchar unique
  location varchar
  description text
  gender text 
}

Table rooms{
  room_id integer pk
  hostel_id integer
  capacity integer
  occupied_spaces integer
  price integer
  status integer
}

Table bookings{
  booking_id integer pk
  user_id integer
  room_id integer
  booking_date integer
  check_in_date integer
  check_out_date integer
  status integer
}

Table amenity{a
  amenity_id integer pk
  name varchar
  description text
}

Table hostel_amenities{
  id integer pk
  hostel_id integer
  amenity_id integer
}


Ref: profiles.user_id - users.user_id
Ref: rooms.hostel_id > hostels.hostel_id
Ref: bookings.user_id > users.user_id
Ref: bookings.room_id > rooms.room_id
Ref: hostel_amenities.hostel_id > hostels.hostel_id
Ref: hostel_amenities.amenity_id > amenity.amenity_id