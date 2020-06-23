from marshmallow import fields, post_load

from receipt_split.models import Receipt, ReceiptItem, Balance
from receipt_split.meta import ma
from . import BaseSchema, UserSchema, get_existing_user, get_existing_users


USER_INFO_FIELDS = ('id', 'fullname', 'username')
RECEIPT_INFO_EXCLUDE_FIELDS = ('receipt_items', 'balances', 'users')


class BalanceSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Balance
        fields = ('id', 'to_user', 'from_user', 'amount', 'receipt_name',
                  'receipt_id', 'paid')

    to_user = ma.Nested(UserSchema)
    from_user = ma.Nested(UserSchema)
    receipt_name = fields.String(dump_only=True)

    @post_load(pass_original=True)
    def get_existing_user(self, data, original_data, **kwargs):
        touser = get_existing_user(self, data, original_data,
                                   user_field="to_user", **kwargs)
        fromuser = get_existing_user(self, touser, original_data,
                                     user_field="from_user", **kwargs)
        return fromuser


class ReceiptItemSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = ReceiptItem
        fields = ('name', 'amount', 'users')

    users = ma.Nested(UserSchema,
                      many=True)

    @post_load(pass_original=True)
    def get_existing_users(self, data, original_data, **kwargs):
        return get_existing_users(self, data, original_data, **kwargs)


class ReceiptSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Receipt
        fields = ('id', 'name', 'amount', 'date', 'resolved',
                  'balances', 'receipt_items', 'users', 'user')
        ordered = True

    id = fields.Int()

    resolved = ma.Boolean(dump_only=True)
    balances = ma.Nested(BalanceSchema, many=True)
    receipt_items = ma.Nested(ReceiptItemSchema, many=True)
    user = ma.Nested(UserSchema)

    users = ma.Nested(UserSchema, many=True)

    @post_load(pass_original=True)
    def get_existing_users(self, data, original_data, **kwargs):
        datawithusers = get_existing_users(self, data, original_data, **kwargs)
        datawithuser = get_existing_user(self, datawithusers,
                                         original_data, **kwargs)
        return datawithuser

    to_user = ma.Nested(UserSchema, include=USER_INFO_FIELDS)
    from_user = ma.Nested(UserSchema, include=USER_INFO_FIELDS)


class ReceiptCreateSchema(ReceiptSchema):
    id = fields.Int(dump_only=True)