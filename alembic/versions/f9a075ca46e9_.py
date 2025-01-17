from alembic import op
import sqlalchemy as sa
import uuid

# revision identifiers, used by Alembic.
revision = 'f9a075ca46e9'  # Sửa lại theo revision của bạn
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # # Tạo bảng 'user'
    # op.create_table('user',
    #     sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    #     sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()),
    #     sa.Column('updated_at', sa.DateTime(), nullable=True, server_default=sa.func.now(), onupdate=sa.func.now()),
    #     sa.Column('full_name', sa.String(), nullable=True),
    #     sa.Column('email', sa.String(), nullable=True, unique=True),
    #     sa.Column('hashed_password', sa.String(length=255), nullable=True),
    #     sa.Column('is_active', sa.Boolean(), nullable=True, default=True),
    #     sa.Column('role', sa.String(), nullable=True),
    #     sa.Column('last_login', sa.DateTime(), nullable=True),
    #     sa.PrimaryKeyConstraint('id')
    # )
    # op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    # op.create_index(op.f('ix_user_full_name'), 'user', ['full_name'], unique=False)
    # op.create_table('addresses',
    #                 sa.Column('address_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()[:8]")),
    #                 sa.Column('user_id', sa.String(50), nullable=False),
    #                 sa.Column('user_name', sa.String(50), nullable=False),
    #                 sa.Column('house_number', sa.String(50), nullable=False),
    #                 sa.Column('street', sa.String(50), nullable=False),
    #                 sa.Column('ward', sa.String(50), nullable=True),
    #                 sa.Column('district', sa.String(50), nullable=False),
    #                 sa.Column('state', sa.String(50), nullable=False),
    #                 sa.Column('phone_number', sa.String(50), nullable=False),
    #
    #                 # Thiết lập khóa ngoại (Foreign Key)
    #                 sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE')
    #                 )
    # op.create_table('vouchers',
    #                 sa.Column('voucher_id', sa.Integer(), primary_key=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('code', sa.String(), unique=True, nullable=False),
    #                 sa.Column('discount_rate', sa.Float(), nullable=False),
    #                 sa.Column('membership_required', sa.Enum("Silver", "Gold", "Diamond", name="membership_required"),
    #                           nullable=False),
    #                 sa.Column('start_date', sa.DateTime(), nullable=False),
    #                 sa.Column('expiration_date', sa.DateTime(), nullable=False),
    #                 sa.Column('usage_limit', sa.Integer(), nullable=False),
    #                 sa.Column('times_used', sa.Integer(), nullable=False),
    #                 sa.Column('status', sa.Enum("Active", "Inactive", name="status"), nullable=False)
    #                 )
    #
    # # Tạo bảng 'payments'
    # op.create_table('payments',
    #                 sa.Column('payment_id', sa.Integer(), primary_key=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('user_id', sa.String(50), sa.ForeignKey('users.user_id'), nullable=False),
    #                 sa.Column('order_id', sa.String(50), sa.ForeignKey('orders.order_id'), nullable=False),
    #                 sa.Column('voucher_id', sa.String(50), sa.ForeignKey('vouchers.voucher_id'), default=None),
    #                 sa.Column('amount', sa.Float(), nullable=False),
    #                 sa.Column('payment_method', sa.Enum('Credit Card', 'Debit Card', 'Cash', name="payment_method"),
    #                           nullable=False),
    #                 sa.Column('payment_date', sa.DateTime(), nullable=False, default=sa.func.now()),
    #                 sa.Column('status', sa.Enum('Successful', 'Failed', 'Pending', name="status"), nullable=False)
    #                 )
    #
    # # Tạo relationship bảng 'vouchers' với bảng 'payments'
    # op.create_foreign_key('fk_voucher_payments', 'payments', 'vouchers', ['voucher_id'], ['voucher_id'])
    #
    # # Tạo relationship bảng 'users' với bảng 'payments'
    # op.create_foreign_key('fk_user_payments', 'payments', 'users', ['user_id'], ['user_id'])
    #
    # # Tạo relationship bảng 'orders' với bảng 'payments'
    # op.create_foreign_key('fk_order_payments', 'payments', 'orders', ['order_id'], ['order_id'])
    # op.create_table('banner',
    #                 sa.Column('banner_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('image', sa.String(50), nullable=True),
    #                 sa.Column('status', sa.Enum("Active", "Inactive", name="banner_status"), nullable=False),
    #                 sa.Column('position', sa.Enum("main", "sidebar", "bottom", name="banner_position")),
    #                 sa.Column('priority', sa.Integer()),
    #                 sa.Column('date_created', sa.DateTime(), server_default=sa.func.now()),
    #                 sa.Column('date_updated', sa.DateTime(), server_default=sa.func.now())
    #                 )
    #
    # # Tạo bảng 'popup'
    # op.create_table('popup',
    #                 sa.Column('popup_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('image', sa.String(50), nullable=False),
    #                 sa.Column('status', sa.Enum("Active", "Inactive", name="popup_status"), nullable=False),
    #                 sa.Column('start_date', sa.DateTime(), server_default=sa.func.now()),
    #                 sa.Column('end_date', sa.DateTime()),
    #                 sa.Column('date_created', sa.DateTime(), server_default=sa.func.now()),
    #                 sa.Column('date_updated', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now())
    #                 )
    #
    # # Thêm index cho bảng 'banner'
    # op.create_index('ix_banner_status', 'banner', ['status'])
    # op.create_index('ix_banner_position', 'banner', ['position'])
    #
    # # Thêm index cho bảng 'popup'
    # op.create_index('ix_popup_status', 'popup', ['status'])
    # op.create_index('ix_popup_start_date', 'popup', ['start_date'])
    # op.create_table('cart',
    #                 sa.Column('cart_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('user_id', sa.String(50), sa.ForeignKey('users.user_id', ondelete='CASCADE'),
    #                           nullable=False)
    #                 )
    #
    # # Tạo bảng 'cart_items'
    # op.create_table('cart_items',
    #                 sa.Column('cart_item_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('cart_id', sa.String(50), sa.ForeignKey('cart.cart_id', ondelete='CASCADE'),
    #                           nullable=False),
    #                 sa.Column('product_id', sa.String(50), sa.ForeignKey('products.product_id', ondelete='CASCADE'),
    #                           nullable=False),
    #                 sa.Column('quantity', sa.Integer(), nullable=True),
    #                 sa.Column('price_at_add', sa.Float(), nullable=True),
    #                 sa.Column('added_date', sa.DateTime(), default=sa.func.now())
    #                 )
    #
    # # Thêm index cho bảng 'cart'
    # op.create_index('ix_cart_user_id', 'cart', ['user_id'])
    #
    # # Thêm index cho bảng 'cart_items'
    # op.create_index('ix_cart_items_cart_id', 'cart_items', ['cart_id'])
    # op.create_index('ix_cart_items_product_id', 'cart_items', ['product_id'])
    # op.create_table('orders',
    #                 sa.Column('order_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('user_id', sa.String(50), sa.ForeignKey('users.user_id', ondelete='CASCADE'),
    #                           nullable=False),
    #                 sa.Column('order_date', sa.DateTime(), default=sa.func.now()),
    #                 sa.Column('status', sa.Enum("Processing", "Delivered", "Canceled", name="OrderStatus"),
    #                           default="Processing"),
    #                 sa.Column('total_amount', sa.Float(), nullable=True)
    #                 )
    #
    # # Tạo bảng 'order_items'
    # op.create_table('order_items',
    #                 sa.Column('order_item_id', sa.String(50), primary_key=True, unique=True,
    #                           default=sa.text("uuid_generate_v4()")),
    #                 sa.Column('order_id', sa.String(50), sa.ForeignKey('orders.order_id'), nullable=False),
    #                 sa.Column('product_id', sa.String(50), sa.ForeignKey('products.product_id'), nullable=False),
    #                 sa.Column('quantity', sa.Integer(), nullable=False),
    #                 sa.Column('price', sa.Float(), nullable=False)
    #                 )
    #
    # # Thêm quan hệ giữa 'orders' và 'order_items'
    # op.create_foreign_key('fk_order_items_orders', 'order_items', 'orders', ['order_id'], ['order_id'])
    # op.create_foreign_key('fk_order_items_products', 'order_items', 'products', ['product_id'], ['product_id'])
    #
    # # Thêm index cho bảng 'orders'
    # op.create_index('ix_orders_user_id', 'orders', ['user_id'])
    #
    # # Thêm index cho bảng 'order_items'
    # op.create_index('ix_order_items_order_id', 'order_items', ['order_id'])
    # op.create_index('ix_order_items_product_id', 'order_items', ['product_id'])
    # op.create_table(
    #     'products',
    #     sa.Column('product_id', sa.String(50), primary_key=True, unique=True,
    #               default=lambda: f"prod{uuid.uuid4().hex[:8]}"),
    #     sa.Column('name', sa.String(100), nullable=False),
    #     sa.Column('name_brand', sa.String(100)),
    #     sa.Column('description', sa.Text),
    #     sa.Column('price', sa.Float, nullable=False),
    #     sa.Column('old_price', sa.Float),
    #     sa.Column('discount', sa.Float, checkconstraint='discount >= 0 AND discount <= 100'),
    #     sa.Column('unit', sa.String(50)),
    #     sa.Column('stock_quantity', sa.Integer, default=0),
    #     sa.Column('image', sa.String(255)),
    #     sa.Column('original_price', sa.Float),
    #     sa.Column('date_created', sa.DateTime, server_default=sa.func.now()),
    #     sa.Column('updated_at', sa.DateTime, server_default=sa.func.now(), onupdate=sa.func.now()),
    #     sa.Column('expiration_date', sa.Date),
    #     sa.Column('star_product', sa.Boolean, default=False),
    #     sa.Column('category_id', sa.String(50), sa.ForeignKey('categories.category_id')),
    # )
    #
    # # Thêm chỉ mục cho category_name trong bảng categories
    # op.create_index('ix_categories_category_name', 'categories', ['category_name'])
    #
    # # Tạo mối quan hệ giữa Category và Product
    # op.create_foreign_key(
    #     'fk_category_product', 'products', 'categories', ['category_id'], ['category_id']
    # )
    #
    # # Tạo bảng mối quan hệ
    # op.create_table(
    #     'categories',
    #     sa.Column('product_id', sa.String(50), sa.ForeignKey('products.product_id'), primary_key=True),
    #     sa.Column('category_id', sa.String(50), sa.ForeignKey('categories.category_id'), primary_key=True),
    # )
    #
    # op.create_table(
    #     'reviews',
    #     sa.Column('review_id', sa.String(50), primary_key=True, unique=True,
    #               default=lambda: f"review{uuid.uuid4().hex[:8]}"),
    #     sa.Column('product_id', sa.String(50), sa.ForeignKey('products.product_id', ondelete='CASCADE'),
    #               nullable=False),
    #     sa.Column('user_id', sa.String(50), sa.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False),
    #     sa.Column('order_id', sa.String(50), sa.ForeignKey('orders.order_id', ondelete='CASCADE'), nullable=False),
    #     sa.Column('rating', sa.Integer),
    #     sa.Column('comment', sa.Text),
    #     sa.Column('review_date', sa.DateTime, server_default=sa.func.now())
    # )
    #
    # # Tạo mối quan hệ với bảng products, users và orders
    # op.create_foreign_key(
    #     'fk_product_reviews', 'reviews', 'products', ['product_id'], ['product_id']
    # )
    # op.create_foreign_key(
    #     'fk_user_reviews', 'reviews', 'users', ['user_id'], ['user_id']
    # )
    # op.create_foreign_key(
    #     'fk_order_reviews', 'reviews', 'orders', ['order_id'], ['order_id']
    # )
    pass
def downgrade():
    # Xóa bảng 'user' và các chỉ mục
    # op.drop_index(op.f('ix_user_full_name'), table_name='user')
    # op.drop_index(op.f('ix_user_email'), table_name='user')
    # op.drop_table('user')
    # op.drop_table('addresses')
    # op.drop_table('payments')
    #
    # # Xóa bảng 'vouchers'
    # op.drop_table('vouchers')
    # op.drop_index('ix_banner_position', table_name='banner')
    # op.drop_index('ix_banner_status', table_name='banner')
    #
    # # Xóa index trong bảng 'popup'
    # op.drop_index('ix_popup_start_date', table_name='popup')
    # op.drop_index('ix_popup_status', table_name='popup')
    #
    # # Xóa bảng 'banner'
    # op.drop_table('banner')
    #
    # # Xóa bảng 'popup'
    # op.drop_table('popup')
    # op.drop_index('ix_cart_user_id', table_name='cart')
    #
    # # Xóa index trong bảng 'cart_items'
    # op.drop_index('ix_cart_items_cart_id', table_name='cart_items')
    # op.drop_index('ix_cart_items_product_id', table_name='cart_items')
    #
    # # Xóa bảng 'cart'
    # op.drop_table('cart')
    #
    # # Xóa bảng 'cart_items'
    # op.drop_table('cart_items')
    # # Xóa index trong bảng 'orders'
    # op.drop_index('ix_orders_user_id', table_name='orders')
    #
    # # Xóa index trong bảng 'order_items'
    # op.drop_index('ix_order_items_order_id', table_name='order_items')
    # op.drop_index('ix_order_items_product_id', table_name='order_items')
    #
    # # Xóa quan hệ giữa 'order_items' và 'orders' cũng như 'order_items' và 'products'
    # op.drop_constraint('fk_order_items_orders', 'order_items', type_='foreignkey')
    # op.drop_constraint('fk_order_items_products', 'order_items', type_='foreignkey')
    #
    # # Xóa bảng 'orders'
    # op.drop_table('orders')
    #
    # # Xóa bảng 'order_items'
    # op.drop_table('order_items')
    # op.drop_table('product_category')
    #
    # # Xóa các chỉ mục và ràng buộc khóa ngoại
    # op.drop_index('ix_categories_category_name', table_name='categories')
    # op.drop_constraint('fk_category_product', 'products', type_='foreignkey')
    #
    # # Xóa bảng products
    # op.drop_table('products')
    #
    # # Xóa bảng categories
    # op.drop_table('categories')
    # # Xóa các mối quan hệ với bảng products, users và orders
    # op.drop_constraint('fk_product_reviews', 'reviews', type_='foreignkey')
    # op.drop_constraint('fk_user_reviews', 'reviews', type_='foreignkey')
    # op.drop_constraint('fk_order_reviews', 'reviews', type_='foreignkey')
    #
    # # Xóa bảng reviews
    # op.drop_table('reviews')
    pass