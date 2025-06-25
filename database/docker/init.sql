-- เปิดใช้ UUID generator
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Affiliator Clients
CREATE TABLE affiliators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keycloak_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

-- 2. Affiliator Websites
CREATE TABLE affiliator_websites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliator_id UUID REFERENCES affiliators(id) ON DELETE CASCADE,
    website_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insurances
CREATE TABLE insurances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    category TEXT CHECK (category IN ('life', 'health', 'car', 'assets', 'travel', 'business', 'responsibility')) NOT NULL,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'THB',
    detail_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Request Logs
CREATE TABLE request_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliator_id UUID REFERENCES affiliators(id) ON DELETE SET NULL,
    website_url TEXT,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    query_params JSONB,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Click Logs
CREATE TABLE click_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliator_id UUID REFERENCES affiliators(id) ON DELETE SET NULL,
    website_url TEXT,
    insurance_id UUID REFERENCES insurances(id) ON DELETE SET NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO insurances (name, company, category, price, detail_url)
VALUES 
('ประกันสุขภาพ พรีเมียม', 'สุขใจประกัน', 'health', 12000, 'https://example.com/insurance/health1'),
('ประกันสุขภาพ แพลทินัม', 'ไทยประกันชีวิต', 'health', 15000, 'https://example.com/insurance/health2'),
('ประกันสุขภาพ Smart', 'HealthCare Co.', 'health', 8900, 'https://example.com/insurance/health3'),
('สุขใจเฮลธ์+', 'ไทยไลฟ์', 'health', 9500, 'https://example.com/insurance/health4'),
('เฮลธ์พลัส ประหยัด', 'สุขภาพดีประกัน', 'health', 6500, 'https://example.com/insurance/health5'),
('ประกันรถยนต์ ชั้น 1', 'DriveSafe', 'car', 18000, 'https://example.com/insurance/car1'),
('ประกันรถยนต์ ชั้น 2+', 'ไทยประกันภัย', 'car', 12000, 'https://example.com/insurance/car2'),
('ประกันรถประหยัด', 'SuperCarCare', 'car', 8500, 'https://example.com/insurance/car3'),
('CarCare Gold', 'AutoSecure', 'car', 10000, 'https://example.com/insurance/car4'),
('DriveEasy ชั้น 3+', 'Thaisafe', 'car', 7200, 'https://example.com/insurance/car5'),
('ประกันชีวิต LifeSafe', 'ชีวิตดีประกัน', 'life', 25000, 'https://example.com/insurance/life1'),
('LifeProtect 20 ปี', 'HappyLife Co.', 'life', 22000, 'https://example.com/insurance/life2'),
('ชีวิตสุขใจ', 'Thailife', 'life', 20000, 'https://example.com/insurance/life3'),
('LifePremium', 'PrimeLife', 'life', 27000, 'https://example.com/insurance/life4'),
('LifeEasy', 'Savelife', 'life', 15000, 'https://example.com/insurance/life5'),
('ประกันเดินทาง เอเชีย', 'TravelGo', 'travel', 3000, 'https://example.com/insurance/travel1'),
('Travel Easy', 'JetCare', 'travel', 2500, 'https://example.com/insurance/travel2'),
('ท่องโลกมั่นใจ', 'AroundWorld', 'travel', 3200, 'https://example.com/insurance/travel3'),
('Backpacker Trip', 'YouthTravel', 'travel', 2100, 'https://example.com/insurance/travel4'),
('Premium Trip', 'SafeTour', 'travel', 4000, 'https://example.com/insurance/travel5'),
('ประกันธุรกิจ SME', 'BizProtect', 'business', 18500, 'https://example.com/insurance/biz1'),
('Office Safe', 'SecureBiz', 'business', 19500, 'https://example.com/insurance/biz2'),
('Business Guard', 'ThaiBiz', 'business', 17500, 'https://example.com/insurance/biz3'),
('SME Easy', 'BizGo', 'business', 16000, 'https://example.com/insurance/biz4'),
('Enterprise Premium', 'ProBusiness', 'business', 23000, 'https://example.com/insurance/biz5'),
('ทรัพย์สินพรีเมียม', 'AssetSafe', 'assets', 30000, 'https://example.com/insurance/asset1'),
('Asset Protect+', 'SafeHome', 'assets', 27000, 'https://example.com/insurance/asset2'),
('บ้านปลอดภัย', 'PropertySecure', 'assets', 25000, 'https://example.com/insurance/asset3'),
('Asset Guard', 'WealthShield', 'assets', 28000, 'https://example.com/insurance/asset4'),
('ทรัพย์สิน Basic', 'GuardAsset', 'assets', 22000, 'https://example.com/insurance/asset5');