-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english', name));
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Sample data generator (run this to insert 10,000+ products)
INSERT INTO products (name, category, price, rating, description)
SELECT 
  'Product ' || generate_series,
  CASE (random() * 4)::int
    WHEN 0 THEN 'Electronics'
    WHEN 1 THEN 'Clothing'
    WHEN 2 THEN 'Books'
    WHEN 3 THEN 'Home'
    ELSE 'Other'
  END,
  (random() * 100000)::numeric(10,2),
  (random() * 5)::numeric(2,1),
  'Description for product ' || generate_series
FROM generate_series(1, 10000);
