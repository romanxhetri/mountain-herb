
-- ==========================================
-- PRODUCTS ONLY RESET SCRIPT (FINAL FIXED IMAGES v11)
-- ==========================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DELETE EXISTING TABLE (Hard Reset)
DROP TABLE IF EXISTS products CASCADE;

-- 3. RE-CREATE TABLE
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  long_description text,
  image text,
  image2 text,
  image3 text,
  category text,
  rating numeric DEFAULT 5.0,
  reviews integer DEFAULT 0,
  discount_badge text,
  botanical_name text,
  uses text,
  dosage text,
  certifications text[],
  stock integer DEFAULT 10,
  bulk_price text,
  tags text[]
);

-- 4. DISABLE RLS
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 5. CREATE PROMO CODES TABLE
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  code text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('percent', 'fixed')),
  value numeric NOT NULL,
  is_active boolean DEFAULT true
);

ALTER TABLE promo_codes DISABLE ROW LEVEL SECURITY;

-- 6. INSERT DEFAULT PROMO CODES
INSERT INTO promo_codes (code, type, value, is_active) VALUES
('HIMALAYA10', 'percent', 0.10, true),
('SAVE500', 'fixed', 500, true),
('SAVE1000', 'fixed', 1000, true),
('SAVE1500', 'fixed', 1500, true)
ON CONFLICT (code) DO NOTHING;

-- 7. CREATE SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  site_name text,
  site_description text,
  keywords text,
  contact_email text,
  contact_phone text,
  currency text DEFAULT 'NPR',
  referral_bonus_amount numeric DEFAULT 200
);

ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- Insert default settings if empty
INSERT INTO site_settings (site_name, contact_email, contact_phone, referral_bonus_amount)
SELECT 'Mountain Herbs Nepal', 'greenmandux@gmail.com', '+977 9823376110', 200
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- 8. CREATE STORAGE BUCKET
-- This command requires the Storage API to be enabled and might fail in standard SQL editor without appropriate privileges.
-- Usually, you must create buckets in the Supabase Dashboard: Storage -> New Bucket -> 'product-images' -> Public.
-- However, we can try to insert if the schema permits:
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Allow public/anon uploads (Simplifies admin panel for this demo context)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );

-- ==========================================
-- 9. INSERT FRESH DATA (Verified Matching Images)
-- ==========================================

-- ------------------------------------------
-- A. BESTSELLERS & SPECIALTY
-- ------------------------------------------
INSERT INTO products (name, price, category, description, long_description, image, stock, rating, reviews, discount_badge) VALUES
('Himalayan Shilajit (Pure Resin)', 4500, 'Wellness', 'Pure, organic Shilajit resin sourced from high altitude rocks.', 'Harvested from 16,000+ ft. Purified using traditional methods. Rich in Fulvic acid and 84+ minerals.', 'https://images.unsplash.com/photo-1629196924294-f25b2a0c2049?auto=format&fit=crop&w=800&q=80', 50, 4.9, 128, 'Best Seller'),
('Himalayan Pink Salt', 120, 'Food', 'Mineral-rich rock salt.', 'Pure pink salt mined from the Himalayan foothills. Rich in trace minerals.', 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80', 500, 4.8, 95, NULL),
('Herbal Hair Oil', 550, 'Personal Care', 'Blend of 10+ herbs for hair growth.', 'Infused with Bhringraj, Amla, and Hibiscus. Prevents hair fall and dandruff.', 'https://images.unsplash.com/photo-1526947425960-94d03627b06d?auto=format&fit=crop&w=800&q=80', 100, 4.9, 88, 'Trending'),
('Herbal Massage Oil', 600, 'Personal Care', 'Relaxing muscle relief oil.', 'Traditional blend of sesame oil and pain-relieving herbs.', 'https://images.unsplash.com/photo-1544367563-12123d8959c9?auto=format&fit=crop&w=800&q=80', 80, 4.8, 45, NULL);

-- ------------------------------------------
-- B. ESSENTIAL OILS
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
-- Floral / Fresh
('Lavender Oil', 450, 'Essential Oils', 'Calming floral aroma for relaxation.', 'https://images.unsplash.com/photo-1593007577531-40994503714b?auto=format&fit=crop&w=800&q=80', 4.9),
('Rosemary Oil', 420, 'Essential Oils', 'Stimulating herbal oil for hair.', 'https://images.unsplash.com/photo-1595123985799-a6ae943c749b?auto=format&fit=crop&w=800&q=80', 4.8),
('Lemongrass Oil', 350, 'Essential Oils', 'Zesty citrus oil for energy.', 'https://images.unsplash.com/photo-1612548403247-aa840d254f15?auto=format&fit=crop&w=800&q=80', 4.7),
('Eucalyptus Oil', 300, 'Essential Oils', 'Cooling oil for respiratory relief.', 'https://images.unsplash.com/photo-1519733838676-920e4c84439c?auto=format&fit=crop&w=800&q=80', 4.8),
('Peppermint Oil', 380, 'Essential Oils', 'Refreshing mint oil for focus.', 'https://images.unsplash.com/photo-1628519592415-e2187763eb4c?auto=format&fit=crop&w=800&q=80', 4.9),
('Tea Tree Oil', 400, 'Essential Oils', 'Antiseptic oil for skin and acne.', 'https://images.unsplash.com/photo-1594389656847-9753c1555513?auto=format&fit=crop&w=800&q=80', 4.8),
('Chamomile Oil', 1200, 'Essential Oils', 'Soothing oil for stress.', 'https://images.unsplash.com/photo-1554497673-a550d554a9d0?auto=format&fit=crop&w=800&q=80', 4.9),
('Basil Oil', 400, 'Essential Oils', 'Clarifying and uplifting.', 'https://images.unsplash.com/photo-1515542706979-3543666b6c00?auto=format&fit=crop&w=800&q=80', 4.5),
-- Woody / Spicy (Using High Quality Amber Bottle or Spice Images)
('Cedarwood Oil', 480, 'Essential Oils', 'Woody aroma for grounding.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.7),
('Pine Needle Oil', 420, 'Essential Oils', 'Fresh forest scent.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.6),
('Juniper Berry Oil', 550, 'Essential Oils', 'Detoxifying and purifying.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.8),
('Thyme Oil', 450, 'Essential Oils', 'Strong immune boosting properties.', 'https://images.unsplash.com/photo-1629813953535-618d3630f92b?auto=format&fit=crop&w=800&q=80', 4.6),
('Oregano Oil', 500, 'Essential Oils', 'Potent natural antibiotic.', 'https://images.unsplash.com/photo-1629813953535-618d3630f92b?auto=format&fit=crop&w=800&q=80', 4.7),
('Clove Oil', 380, 'Essential Oils', 'Warming oil for toothaches.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.8),
('Cinnamon Bark Oil', 550, 'Essential Oils', 'Spicy, warming circulation.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.9),
('Cardamom Oil', 900, 'Essential Oils', 'Sweet, spicy aroma.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.8),
('Turmeric Oil', 450, 'Essential Oils', 'Anti-inflammatory and radiant skin.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.7),
('Ginger Oil', 420, 'Essential Oils', 'Warming, good for digestion.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.6),
('Garlic Oil', 300, 'Essential Oils', 'Strong antimicrobial.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.5),
('Neem Oil', 250, 'Essential Oils', 'Powerful for skin infections.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.7),
('Sandalwood Oil', 1500, 'Essential Oils', 'Sacred, woody aroma.', 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80', 5.0),
('Patchouli Oil', 600, 'Essential Oils', 'Earthy, grounding.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.8),
('Vetiver (Khus) Oil', 800, 'Essential Oils', 'Deeply grounding and cooling.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.9),
('Ylang Ylang Oil', 700, 'Essential Oils', 'Sweet floral scent.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.8),
('Frankincense Oil', 850, 'Essential Oils', 'King of oils, cellular health.', 'https://images.unsplash.com/photo-1608528577891-9b740702d089?auto=format&fit=crop&w=800&q=80', 4.9);

-- ------------------------------------------
-- C. HERBS (Roots, Stems, Dried Leaves)
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
('Jatamansi', 1200, 'Herbs', 'Himalayan Spikenard for sleep.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.9),
('Kutki', 1800, 'Herbs', 'Bitter liver tonic.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8),
('Chirayita', 950, 'Herbs', 'Blood purifier.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.7),
('Timur', 780, 'Herbs', 'Szechuan Pepper, numbing spice.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.9),
('Jimbu', 90, 'Herbs', 'Aromatic dried herb.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 5.0),
('Atis', 1500, 'Herbs', 'Aconite root.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.6),
('Sugandhwal', 800, 'Herbs', 'Valerian root.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.7),
('Daruhaldi', 600, 'Herbs', 'Tree Turmeric.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.5),
('Banafsha', 700, 'Herbs', 'Wild Violet.', 'https://images.unsplash.com/photo-1557929036-dfd2fa784d12?auto=format&fit=crop&w=800&q=80', 4.6),
('Padamchal', 500, 'Herbs', 'Himalayan Rhubarb.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.7),
('Panchaule', 2500, 'Herbs', 'Salep Orchid root.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 5.0),
('Bhojpatra', 400, 'Herbs', 'Himalayan Birch bark.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8),
('Tejpatta (Bay Leaf)', 100, 'Herbs', 'Himalayan Bay Leaves.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.9),
('Tulsi', 120, 'Herbs', 'Holy Basil dried leaves.', 'https://images.unsplash.com/photo-1628519592415-e2187763eb4c?auto=format&fit=crop&w=800&q=80', 4.9),
('Ashwagandha', 420, 'Herbs', 'Winter Cherry root.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8),
('Shatavari', 480, 'Herbs', 'Asparagus root tonic.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8),
('Guduchi (Giloy)', 260, 'Herbs', 'Immunity boosting stem.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.9),
('Brahmi', 380, 'Herbs', 'Memory boosting herb.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.7),
('Vacha', 550, 'Herbs', 'Sweet Flag root.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.6),
('Haritaki', 300, 'Herbs', 'Digestive fruit.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8);

-- ------------------------------------------
-- D. POWDERS
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
('Turmeric Powder', 220, 'Powders', 'High curcumin organic turmeric.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.9),
('Ginger Powder', 260, 'Powders', 'Dried ginger powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.8),
('Neem Powder', 240, 'Powders', 'Bitter detoxifying powder.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.7),
('Amla Powder', 280, 'Powders', 'Vitamin C rich gooseberry.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.9),
('Triphala Powder', 320, 'Powders', 'Digestive blend.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.9),
('Ashwagandha Powder', 450, 'Powders', 'Stress relief root powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.8),
('Brahmi Powder', 400, 'Powders', 'Brain tonic powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.7),
('Moringa Powder', 350, 'Powders', 'Superfood leaf powder.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.8),
('Tulsi Powder', 200, 'Powders', 'Holy Basil leaf powder.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.9),
('Shikakai Powder', 250, 'Powders', 'Natural hair cleanser.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.6),
('Reetha Powder', 250, 'Powders', 'Soapnut powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.7),
('Multani Mitti', 150, 'Powders', 'Fullers earth face pack.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.8),
('Sandalwood Powder', 1500, 'Powders', 'Fragrant wood powder.', 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80', 5.0),
('Vetiver Powder', 600, 'Powders', 'Cooling root powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.8),
('Mulethi Powder', 300, 'Powders', 'Licorice root powder.', 'https://images.unsplash.com/photo-1615485500704-8e99099d9d0f?auto=format&fit=crop&w=800&q=80', 4.7);

-- ------------------------------------------
-- E. SEEDS & RESINS
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
('Fenugreek Seeds', 120, 'Seeds', 'Methi seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.7),
('Kalonji', 180, 'Seeds', 'Black Cumin seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.8),
('Ajwain', 150, 'Seeds', 'Carom seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.6),
('Fennel Seeds', 140, 'Seeds', 'Sweet Saunf.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.9),
('Coriander Seeds', 130, 'Seeds', 'Whole Dhaniya seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.7),
('Flaxseed', 200, 'Seeds', 'Omega-3 rich seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.8),
('Chia Seeds', 450, 'Seeds', 'Superfood seeds.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.9),
('Hemp Seeds', 500, 'Seeds', 'Protein rich hearts.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.7),
('Sesame Seeds', 160, 'Seeds', 'White Til.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.6),
('Mustard Seeds', 100, 'Seeds', 'Black Sarso.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 4.7),
('Frankincense Resin', 800, 'Resins', 'Natural gum resin.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.9),
('Myrrh Resin', 900, 'Resins', 'Ancient healing resin.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8),
('Pine Resin', 300, 'Resins', 'Natural pine gum.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.5),
('Gum Arabic', 400, 'Resins', 'Edible gum.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.6),
('Asafoetida (Raw)', 1200, 'Resins', 'Hing resin.', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', 4.8);

-- ------------------------------------------
-- F. TEAS
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
('Himalayan Green Tea', 280, 'Teas', 'High altitude organic green tea.', 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80', 4.8),
('Tulsi Tea', 250, 'Teas', 'Holy basil herbal infusion.', 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80', 4.9),
('Lemongrass Tea', 240, 'Teas', 'Citrusy refreshing tea.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.7),
('Ginger Tea', 220, 'Teas', 'Warming spicy tea.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.6),
('Chamomile Tea', 350, 'Teas', 'Sleep inducing floral tea.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.9),
('Mint Herbal Tea', 240, 'Teas', 'Cooling peppermint leaves.', 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80', 4.8),
('Turmeric Tea', 260, 'Teas', 'Anti-inflammatory golden tea.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.7),
('Ashwagandha Tea', 300, 'Teas', 'Stress relief tea.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.6),
('Detox Herbal Tea', 320, 'Teas', 'Cleansing blend of herbs.', 'https://images.unsplash.com/photo-1594631252845-d9b502913043?auto=format&fit=crop&w=800&q=80', 4.8),
('Immunity Booster Tea', 350, 'Teas', 'Blend of Tulsi, Ginger, Giloy.', 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80', 4.9);

-- ------------------------------------------
-- G. CARRIER OILS & OTHERS
-- ------------------------------------------
INSERT INTO products (name, price, category, description, image, rating) VALUES
('Almond Oil', 600, 'Carrier Oils', 'Sweet almond oil.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.8),
('Coconut Oil (Virgin)', 450, 'Carrier Oils', 'Cold pressed virgin coconut oil.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.9),
('Sesame Oil', 350, 'Carrier Oils', 'Warm oil for massage.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.7),
('Mustard Oil', 250, 'Carrier Oils', 'Traditional stimulating oil.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.6),
('Jojoba Oil', 900, 'Carrier Oils', 'Balancing oil for face.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.9),
('Olive Oil', 800, 'Carrier Oils', 'Rich moisturizing oil.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.8),
('Castor Oil', 300, 'Carrier Oils', 'Thick oil for hair growth.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.7),
('Rose Water', 250, 'Skincare', 'Pure distillate of roses.', 'https://images.unsplash.com/photo-1548586049-598d1bb7d22e?auto=format&fit=crop&w=800&q=80', 4.8),
('Aloe Vera Gel', 300, 'Skincare', 'Soothing gel for skin.', 'https://images.unsplash.com/photo-1599421490143-a4339e25d273?auto=format&fit=crop&w=800&q=80', 4.8),
('Witch Hazel Extract', 450, 'Skincare', 'Natural astringent toner.', 'https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?auto=format&fit=crop&w=800&q=80', 4.7);
