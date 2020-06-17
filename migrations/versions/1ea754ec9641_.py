"""empty message

Revision ID: 1ea754ec9641
Revises: 51c5ef3e73c5
Create Date: 2020-06-16 15:38:05.086798

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1ea754ec9641'
down_revision = '51c5ef3e73c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('settlement',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('to_user_id', sa.Integer(), nullable=False),
    sa.Column('owed_amount', sa.Float(asdecimal=True), nullable=False),
    sa.Column('paid_amount', sa.Float(asdecimal=True), nullable=False),
    sa.CheckConstraint('user_id <> to_user_id'),
    sa.ForeignKeyConstraint(['to_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'to_user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('settlement')
    # ### end Alembic commands ###
