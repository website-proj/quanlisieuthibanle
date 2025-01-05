"""add original_price to product

Revision ID: 1d2e652c727a
Revises: f9a075ca46e9
Create Date: 2025-01-05 09:32:26.190104

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1d2e652c727a'
down_revision = 'f9a075ca46e9'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('products', sa.Column('original_price', sa.Float(), nullable=True))

def downgrade():
    op.drop_column('products', 'original_price')
