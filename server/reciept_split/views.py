from flask import Blueprint, request
from flask_api import status
from flask_jwt import current_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

from datetime import date
import simplejson

from .meta import db
from .auth import identity
from .models import User, Reciept
from .schemas import UserSchema, RecieptSchema
from .forms import RecieptForm


views = Blueprint('views', __name__)


user_schema = UserSchema()
reciept_schema = RecieptSchema()
reciepts_schema = RecieptSchema(many=True)


@views.route('/reciept', methods=['GET'])
@jwt_required()
def reciept_list():
    reciepts_owned = reciepts_schema.dump(current_identity.reciepts_owned)
    reciepts_owned_map = {r["id"]: True for r in reciepts_owned}

    reciepts_in = reciepts_schema.dump(current_identity.reciepts_in)
    reciept_notin_owned = [
        r for r in reciepts_in if r["id"] not in reciepts_owned_map
    ]

    all_reciepts = reciepts_owned + reciept_notin_owned

    return all_reciepts, status.HTTP_200_OK


@views.route('/reciept/<int:id>',
             methods=['GET', 'PUT', 'PATCH', 'DELETE'])
@jwt_required()
def reciept_by_id(id):
    reciept = Reciept.query.get(id)

    if not reciept:
        return {"error": "Reciept with id does not exist"},\
                status.HTTP_404_NOT_FOUND

    if request.method == 'GET':
        reciept_dump = reciept_schema.dump(reciept)
        return reciept_dump, status.HTTP_200_OK

    if not request.is_json:
        return {"error": "Not JSON"}, status.HTTP_400_BAD_REQUEST

    if reciept.user != current_identity:
        return {"error": "Your do not own this reciept"},\
                status.HTTP_401_UNAUTHORIZED

    json_data = request.get_json()

    form = RecieptForm.from_json(json_data)
    if not form.validate():
        return form.errors, status.HTTP_400_BAD_REQUEST

    if request.method == 'PUT' or request.method == 'PATCH':
        json_data["id"] = id
        reciept_data = reciept_schema.load(json_data, session=db.session)

        db.session.add(reciept_data)
        db.session.commit()

        reciept_dump = reciept_schema.dump(reciept)
        return reciept_dump, status.HTTP_200_OK

    if request.method == 'DELETE':
        db.session.delete(reciept)
        db.session.commit()
        return None, status.HTTP_200_OK

    return {"error": "should not get here"}, status.HTTP_400_BAD_REQUEST


@views.route('/reciept', methods=['POST', 'PUT'])
@jwt_required()
def reciept_create():
    if not request.is_json:
        return {"error": "Not JSON"}, status.HTTP_400_BAD_REQUEST

    json_data = request.get_json()

    form = RecieptForm.from_json(json_data)
    if not form.validate():
        return form.errors, status.HTTP_400_BAD_REQUEST

    reciept_data = reciept_schema.load(json_data)
    reciept_data.user = current_identity

    db.session.add(reciept_data)
    db.session.commit()

    reciept_dump = reciept_schema.dump(reciept_data)

    return reciept_dump, status.HTTP_201_CREATED


@views.route('/user', methods=['GET'])
@jwt_required()
def user():
    user_dump = user_schema.dump(current_identity)
    return user_dump, status.HTTP_200_OK


@views.route('/friend/<username>', methods=['POST'])
@jwt_required()
def friend_add(username):
    friend = User.query.filter_by(username=username).first()
    print("FRIEND///////////")
    print(friend)
    print("FRIEND///////////")

    if friend is None:
        return {"error": "friend does not exist"}, status.HTTP_400_BAD_REQUEST

    if friend == current_identity:
        return {"error": "cannot friend yourself"}, status.HTTP_400_BAD_REQUEST

    if friend not in current_identity.friends:
        current_identity.friends.append(friend)
        db.session.add(current_identity)
        db.session.commit()

    if current_identity not in friend.friends:
        friend.friends.append(current_identity)
        db.session.add(friend)
        db.session.commit()

    friend_dump = user_schema.dump(friend)
    return friend_dump, status.HTTP_200_OK
