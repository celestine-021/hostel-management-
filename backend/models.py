class Profile(db.Model, SerializerMixin):
    __tablename__ = "profiles"

    serialize_rules = ("-user.profile",)

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20))
    registration_number = db.Column(db.String(50), unique=True)
    course = db.Column(db.String(120))
    year_of_study = db.Column(db.Integer)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="profile"
    )