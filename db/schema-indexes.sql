-- ============================================================================
-- KuberQ High-Concurrency Schema & High-Frequency Indexing Migration
-- Target: 200+ simultaneous connections (100 merchants + 100 customers)
-- ============================================================================

-- 1. STORES / MERCHANTS TABLE
CREATE TABLE IF NOT EXISTS merchants (
    id VARCHAR(64) PRIMARY KEY,
    shop_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    ref_code VARCHAR(30) UNIQUE,
    city VARCHAR(60),
    state VARCHAR(60),
    category VARCHAR(60),
    gstin VARCHAR(20),
    open BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    daily_token_counter INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fast Store lookup by ref_code, city, and active status
CREATE INDEX IF NOT EXISTS idx_merchants_refcode ON merchants (ref_code);
CREATE INDEX IF NOT EXISTS idx_merchants_active_cat ON merchants (active, category);

-- 2. PRODUCTS & INVENTORY TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    shop_id VARCHAR(64) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(80),
    price NUMERIC(12, 2) NOT NULL,
    wholesale_price NUMERIC(12, 2),
    moq INT DEFAULT 1,
    stock INT NOT NULL DEFAULT 0,
    unit VARCHAR(30) DEFAULT 'pc',
    barcode VARCHAR(64),
    sku VARCHAR(64),
    active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HIGH-FREQUENCY INDEXES FOR 100 SIMULTANEOUS CUSTOMERS:
-- A) Filter products by shop_id and category in sub-millisecond time:
CREATE INDEX IF NOT EXISTS idx_products_shop_cat ON products (shop_id, category);

-- B) Real-time Stock Lockout index (checks if stock <= 0):
CREATE INDEX IF NOT EXISTS idx_products_shop_stock ON products (shop_id, stock);

-- C) Barcode scanning lookup on POS Counter gun:
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products (shop_id, barcode) WHERE barcode IS NOT NULL;

-- 3. ORDERS & COUNTER QUEUE TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    invoice_no VARCHAR(40) NOT NULL,
    shop_id VARCHAR(64) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    token_number VARCHAR(10) NOT NULL,
    customer_name VARCHAR(120),
    customer_phone VARCHAR(20),
    status VARCHAR(40) NOT NULL DEFAULT 'Received',
    payment_mode VARCHAR(30) DEFAULT 'Cash',
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    udhaar_settled BOOLEAN DEFAULT TRUE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HIGH-FREQUENCY INDEXES FOR 100 MERCHANTS + 100 CUSTOMERS:
-- A) Live Counter Display / Queue Board (Status transitions: Received, In Preparation, Ready for Pickup):
CREATE INDEX IF NOT EXISTS idx_orders_shop_status ON orders (shop_id, status);

-- B) Instant 3-Digit Token Number Verification (#101 to #999):
CREATE INDEX IF NOT EXISTS idx_orders_shop_token ON orders (shop_id, token_number);

-- C) Merchant Chronological Order Feed & POS History:
CREATE INDEX IF NOT EXISTS idx_orders_shop_created ON orders (shop_id, created_at DESC);

-- D) Customer Phone lookup (Order history & Khata ledger balance):
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders (customer_phone, shop_id);

-- 4. USERS & RBAC TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100),
    role VARCHAR(30) NOT NULL DEFAULT 'customer',
    shop_id VARCHAR(64) REFERENCES merchants(id) ON DELETE SET NULL,
    password_hash VARCHAR(256),
    unique_id VARCHAR(30) UNIQUE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone);
CREATE INDEX IF NOT EXISTS idx_users_shop ON users (shop_id) WHERE shop_id IS NOT NULL;
