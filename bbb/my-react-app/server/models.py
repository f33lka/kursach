from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Collector(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contact = db.Column(db.String(100), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'contact': self.contact
        }

class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'owner': self.owner
        }

class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    theme = db.Column(db.String(100))
    country = db.Column(db.String(50))
    features = db.Column(db.String(200))
    release_date = db.Column(db.String(10))
    circulation = db.Column(db.Integer)
    acquisition_date = db.Column(db.String(10))
    price = db.Column(db.Float)
    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id', ondelete='CASCADE'))  # 改为 collection_id

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'theme': self.theme,
            'country': self.country,
            'features': self.features,
            'release_date': self.release_date,
            'circulation': self.circulation,
            'acquisition_date': self.acquisition_date,
            'price': self.price,
            'collection_id': self.collection_id
        }