from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, '../database/data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Сущность Brand
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
    collector_id = db.Column(db.Integer, db.ForeignKey('collector.id', ondelete='CASCADE'))

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
            'collector_id': self.collector_id
        }

# Сущность Collection
class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String(100), nullable=False)  # Владелец

    def to_dict(self):
        return {
            'id': self.id,
            'owner': self.owner
        }

# Сущность Collector
class Collector(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contact = db.Column(db.String(100), nullable=False)  # Контакт

    def to_dict(self):
        return {
            'id': self.id,
            'contact': self.contact
        }

def get_brand_value(brand):
    return brand.price * (brand.circulation or 1)

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request', 'message': str(error)}), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'error': 'Internal server error', 'message': str(error)}), 500

@app.route('/api/collectors/sort_by_rare_brands', methods=['GET'])
def sort_collectors_by_rare_brands():
    # Определение редкой марки (цена > 1000)
    rare_threshold = 1000

    # Получаем всех коллекционеров
    collectors = Collector.query.all()
    collector_rare_brands_count = []

    for collector in collectors:
        # Получаем все бренды для данного коллекционера
        brands = Brand.query.filter_by(collector_id=collector.id).all()
        # Подсчитываем количество редких марок
        rare_brands_count = sum(1 for brand in brands if brand.price > rare_threshold)
        collector_rare_brands_count.append({
            "collector_id": collector.id,
            "contact": collector.contact,
            "rare_brands_count": rare_brands_count
        })

    # Найдем коллекционера с наибольшим количеством редких марок
    if collector_rare_brands_count:
        most_rare_brands_collector = max(collector_rare_brands_count, key=lambda x: x["rare_brands_count"])
        return jsonify(most_rare_brands_collector)
    else:
        return jsonify({"error": "No collectors found"}), 404

@app.route('/api/owners/sort_by_collection_value', methods=['GET'])
def sort_owners_by_collection_value():
    # Получаем всех коллекционеров
    collectors = Collector.query.all()
    collector_collection_value = []

    for collector in collectors:
        # Получаем все бренды для данного коллекционера
        brands = Brand.query.filter_by(collector_id=collector.id).all()
        # Рассчитываем общую стоимость коллекции
        collection_value = sum(brand.price for brand in brands)
        collector_collection_value.append({
            "collector_id": collector.id,
            "contact": collector.contact,
            "collection_value": collection_value
        })

    # Сортируем коллекционеров по общей стоимости коллекции (по убыванию)
    sorted_collectors = sorted(collector_collection_value, key=lambda x: x["collection_value"], reverse=True)

    return jsonify(sorted_collectors)

@app.route('/api/owners/sort_by_most_expensive_brand', methods=['GET'])
def sort_owners_by_most_expensive_brand():
    # Получаем все коллекции и их владельцев
    collections = Collection.query.all()
    owners = {}

    for collection in collections:
        owner = collection.owner
        if owner not in owners:
            owners[owner] = []

        # Получаем все бренды для данной коллекции
        brands = Brand.query.filter_by(collector_id=collection.id).all()
        owners[owner].extend(brands)

    # Найдем владельца с самой дорогой маркой
    most_expensive_owner = None
    highest_price = 0

    for owner, brands in owners.items():
        if brands:
            max_price = max(brand.price for brand in brands)
            if max_price > highest_price:
                highest_price = max_price
                most_expensive_owner = owner

    if most_expensive_owner:
        return jsonify({
            "owner": most_expensive_owner,
            "most_expensive_brand_price": highest_price
        })
    else:
        return jsonify({"error": "No brands found"}), 404

# CRUD для Brand
@app.route('/api/brands', methods=['POST'])
def create_brand():
    data = request.get_json()
    if not data or 'name' not in data or 'country' not in data or 'collectorContact' not in data:
        abort(400, description="Missing 'name', 'country', or 'collectorContact' in request")
    
    collector_contact = data['collectorContact']
    collector = Collector.query.filter_by(contact=collector_contact).first()
    
    # 如果收藏家不存在，创建新的收藏家和默认的收藏
    if not collector:
        collector = Collector(contact=collector_contact)
        db.session.add(collector)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500, description=str(e))
        
        # 创建默认的收藏
        new_collection = Collection(owner=collector_contact)
        db.session.add(new_collection)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500, description=str(e))
    
    # 创建新的品牌
    new_brand = Brand(
        name=data['name'],
        theme=data.get('theme'),
        country=data['country'],
        features=data.get('features'),
        release_date=data.get('release_date'),
        circulation=data.get('circulation'),
        acquisition_date=data.get('acquisition_date'),
        price=data.get('price'),
        collector_id=collector.id
    )
    db.session.add(new_brand)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    return jsonify(new_brand.to_dict()), 201

@app.route('/api/collections/group_by_owner', methods=['GET'])
def group_collections_by_owner():
    collections = Collection.query.all()
    grouped = {}
    for collection in collections:
        owner = collection.owner
        if owner not in grouped:
            grouped[owner] = []
        grouped[owner].append(collection.to_dict())
    return jsonify(grouped)

@app.route('/api/brands/group_by_collector', methods=['GET'])
def group_brands_by_collector():
    collectors = Collector.query.all()
    grouped = {}
    for collector in collectors:
        collector_id = collector.id
        brands = Brand.query.filter_by(collector_id=collector_id).all()
        if brands:
            grouped[collector.contact] = [brand.to_dict() for brand in brands]
    return jsonify(grouped)

@app.route('/api/brands/group_rare_by_collector', methods=['GET'])
def group_rare_brands_by_collector():
    rare_brands = Brand.query.filter(Brand.price > 1000).all()
    grouped_brands = {}
    
    for brand in rare_brands:
        collector_contact = Collector.query.get(brand.collector_id).contact
        if collector_contact not in grouped_brands:
            grouped_brands[collector_contact] = []
        grouped_brands[collector_contact].append(brand.to_dict())
    
    return jsonify(grouped_brands)

@app.route('/api/brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()
    return jsonify([brand.to_dict() for brand in brands])

# CRUD для Collection
@app.route('/api/collections', methods=['POST'])
def create_collection():
    data = request.get_json()
    if not data or 'owner' not in data:
        abort(400, description="Missing 'owner' in request")
    
    owner = data['owner']
    collector = Collector.query.filter_by(contact=owner).first()
    
    # 如果收藏家不存在，创建新的收藏家
    if not collector:
        collector = Collector(contact=owner)
        db.session.add(collector)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500, description=str(e))
    
    # 创建新的收藏
    new_collection = Collection(owner=owner)
    db.session.add(new_collection)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    return jsonify(new_collection.to_dict()), 201

@app.route('/api/collections', methods=['GET'])
def get_collections():
    collections = Collection.query.all()
    return jsonify([collection.to_dict() for collection in collections])

# CRUD для Collector
@app.route('/api/collectors', methods=['POST'])
def create_collector():
    data = request.get_json()
    if not data or 'contact' not in data:
        abort(400, description="Missing 'contact' in request")
    
    collector = Collector.query.filter_by(contact=data['contact']).first()
    if collector:
        abort(400, description="Collector already exists")
    
    new_collector = Collector(contact=data['contact'])
    db.session.add(new_collector)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    new_collection = Collection(owner=data['contact'])
    db.session.add(new_collection)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    return jsonify(new_collector.to_dict()), 201

@app.route('/api/collectors', methods=['GET'])
def get_collectors():
    collectors = Collector.query.all()
    return jsonify([collector.to_dict() for collector in collectors])

# CRUD для Brand (добавляем DELETE)
@app.route('/api/brands/<int:brand_id>', methods=['DELETE'])
def delete_brand(brand_id):
    brand = Brand.query.get(brand_id)
    if not brand:
        abort(404, description="Brand not found")
    try:
        db.session.delete(brand)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    return jsonify({'message': 'Brand deleted successfully'}), 200

# CRUD для Collection (добавляем DELETE)
@app.route('/api/collections/<int:collection_id>', methods=['DELETE'])
def delete_collection(collection_id):
    collection = Collection.query.get(collection_id)
    if not collection:
        abort(404, description="Collection not found")
    
    try:
        # 删除与该收藏关联的所有品牌
        Brand.query.filter_by(collector_id=collection_id).delete()
        # 删除收藏
        db.session.delete(collection)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    return jsonify({'message': 'Collection and associated brands deleted successfully'}), 200

# CRUD для Collector (добавляем DELETE)
@app.route('/api/collectors/<int:collector_id>', methods=['DELETE'])
def delete_collector(collector_id):
    collector = Collector.query.get(collector_id)
    if not collector:
        abort(404, description="Collector not found")
    
    try:
        # 删除与该收藏家关联的所有品牌
        Brand.query.filter_by(collector_id=collector_id).delete()
        # 删除与该收藏家关联的所有收藏
        Collection.query.filter_by(owner=collector.contact).delete()
        # 删除收藏家
        db.session.delete(collector)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))
    
    return jsonify({'message': 'Collector and associated collections and brands deleted successfully'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)