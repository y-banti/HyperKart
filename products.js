// ============================================================
// HYPEKART — Central Product Database
// ============================================================

const categoryMeta = {
    clothing: { label: 'Clothing Collection', icon: '👗', navLabel: 'Clothing' },
    watches: { label: 'Watch Collection', icon: '⌚', navLabel: 'Watches' },
    accessories: { label: 'Accessories', icon: '👜', navLabel: 'Accessories' },
    electronics: { label: 'Electronics', icon: '🎧', navLabel: 'Electronics' },
    home: { label: 'Home Essentials', icon: '🏠', navLabel: 'Home' },
    bottles: { label: 'Bottle Collection', icon: '🍶', navLabel: 'Bottles' }
};

const products = [
    // ── CLOTHING ──────────────────────────────────────────
    {
        id: 'clothing-1',
        name: 'Printed Co-ord Set',
        price: 1499,
        category: 'clothing',
        rating: 4.5,
        reviewCount: 89,
        description: 'Stylish printed co-ord set perfect for casual outings and everyday wear. Made from premium quality fabric for comfort all day long.',
        features: ['Premium Quality Fabric', 'Trendy Printed Design', 'Comfortable Fit', 'Machine Washable', 'Breathable Material'],
        images: [
            'https://placehold.co/600x600/f9d0e0/9d4f6f?text=Co-ord+Set',
            'https://placehold.co/600x600/f5c2d6/9d4f6f?text=Front+View',
            'https://placehold.co/600x600/f0afc7/9d4f6f?text=Back+View',
            'https://placehold.co/600x600/f9d0e0/9d4f6f?text=Detail'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#fbbf24', '#3b82f6', '#ec4899'],
        tags: ['clothing', 'co-ord', 'printed', 'casual', 'women', 'set'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-001'
    },
    {
        id: 'clothing-2',
        name: 'Combo Stylish Pants',
        price: 1899,
        category: 'clothing',
        rating: 4.3,
        reviewCount: 42,
        description: 'A versatile combo of stylish pants suitable for both office and casual wear. Tailored for a perfect fit every day.',
        features: ['Stretchable Fabric', 'Slim Fit', 'Multiple Pockets', 'Wrinkle-resistant', 'All-day Comfort'],
        images: ['https://placehold.co/600x600/f9d0e0/9d4f6f?text=Stylish+Pants'],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['#000000', '#1f2937', '#4b5563'],
        tags: ['clothing', 'pants', 'combo', 'office', 'casual'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-002'
    },
    {
        id: 'clothing-3',
        name: 'Combo Cotton Shorts',
        price: 999,
        category: 'clothing',
        rating: 4.6,
        reviewCount: 120,
        description: 'Super soft cotton shorts pack. Ideal for lounging or summer outings. Breathable and lightweight.',
        features: ['100% Pure Cotton', 'Elastic Waistband', 'Soft & Breathable', 'Colorfast', 'Easy Care'],
        images: ['https://placehold.co/600x600/f9d0e0/9d4f6f?text=Cotton+Shorts'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#374151', '#9ca3af'],
        tags: ['clothing', 'shorts', 'cotton', 'combo', 'summer'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-003'
    },
    {
        id: 'clothing-4',
        name: 'Combo Stretchable Shorts',
        price: 1199,
        category: 'clothing',
        rating: 4.4,
        reviewCount: 55,
        description: 'Maximum comfort with these stretchable shorts. Designed for movement and flexibility in every activity.',
        features: ['4-way Stretch', 'Quick Dry', 'Zipper Pockets', 'Athletic Fit', 'Moisture Wicking'],
        images: ['https://placehold.co/600x600/f9d0e0/9d4f6f?text=Stretch+Shorts'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#1e3a8a', '#000000'],
        tags: ['clothing', 'shorts', 'stretchable', 'athletic', 'combo'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-004'
    },
    {
        id: 'clothing-5',
        name: 'Combo 4 Stretchable Shorts',
        price: 1799,
        category: 'clothing',
        rating: 4.8,
        reviewCount: 210,
        description: 'Value pack of 4 premium stretchable shorts. The ultimate wardrobe essential at an unbeatable price.',
        features: ['Value Pack of 4', 'High Durability', 'Sweat Wicking', 'Premium Finish', 'Multiple Colors'],
        images: ['https://placehold.co/600x600/f9d0e0/9d4f6f?text=4+Shorts+Pack'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#3b82f6', '#10b981', '#ef4444', '#000000'],
        tags: ['clothing', 'shorts', 'combo', 'value pack', 'stretchable'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-005'
    },
    {
        id: 'clothing-6',
        name: 'Brown Cargo Trouser',
        price: 1599,
        category: 'clothing',
        rating: 4.5,
        reviewCount: 67,
        description: 'Rugged and stylish brown cargo trousers with ample storage pockets and a relaxed comfortable fit.',
        features: ['6 Utility Pockets', 'Heavy-duty Cotton', 'Relaxed Fit', 'Rugged Stitching', 'Durable'],
        images: ['https://placehold.co/600x600/f9d0e0/9d4f6f?text=Cargo+Trouser'],
        sizes: ['30', '32', '34', '36', '38'],
        colors: ['#78350f'],
        tags: ['clothing', 'cargo', 'trouser', 'casual', 'utility'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-CLO-006'
    },

    // ── WATCHES ───────────────────────────────────────────
    {
        id: 'watch-1',
        name: 'Casio Vintage Digital Gold Watch',
        price: 3499,
        category: 'watches',
        rating: 4.9,
        reviewCount: 350,
        description: 'The classic retro design suitable for every occasion. A timeless masterpiece with vintage charm and modern reliability.',
        features: ['Water Resistant', 'Daily Alarm', 'Stainless Steel Band', 'Auto Calendar', 'LED Backlight'],
        images: ['https://placehold.co/600x600/ffeaa0/8b6914?text=Casio+Gold'],
        sizes: [],
        colors: ['#fbbf24'],
        tags: ['watches', 'casio', 'vintage', 'digital', 'gold', 'retro'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-WAT-001'
    },
    {
        id: 'watch-2',
        name: 'Luxury Stainless Steel Watch',
        price: 8999,
        category: 'watches',
        rating: 4.7,
        reviewCount: 28,
        description: 'Premium stainless steel watch for the modern gentleman. Elegant, robust, and built to last a lifetime.',
        features: ['Sapphire Crystal', 'Automatic Movement', '100m Water Resistance', 'Luminous Hands', 'Date Display'],
        images: ['https://placehold.co/600x600/ffeaa0/8b6914?text=Luxury+Watch'],
        sizes: [],
        colors: ['#9ca3af'],
        tags: ['watches', 'luxury', 'stainless steel', 'automatic', 'premium'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-WAT-002'
    },
    {
        id: 'watch-3',
        name: 'Men Silver Strap Watch',
        price: 2799,
        category: 'watches',
        rating: 4.2,
        reviewCount: 45,
        description: 'Sleek silver strap watch with a minimalist dial. Perfect for business wear and formal occasions.',
        features: ['Quartz Movement', 'Minimalist Design', 'Clasp Lock', 'Scratch Resistant', 'Lightweight'],
        images: ['https://placehold.co/600x600/ffeaa0/8b6914?text=Silver+Watch'],
        sizes: [],
        colors: ['#d1d5db'],
        tags: ['watches', 'silver', 'minimalist', 'business', 'men'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-WAT-003'
    },
    {
        id: 'watch-4',
        name: "Men's Analog Leather Watch",
        price: 3299,
        category: 'watches',
        rating: 4.6,
        reviewCount: 92,
        description: 'Sophisticated analog watch with a genuine leather strap for the discerning gentleman who values timeless style.',
        features: ['Genuine Leather Strap', 'Date Display', 'Precision Timing', 'Gold Plated Case', 'Classic Design'],
        images: ['https://placehold.co/600x600/ffeaa0/8b6914?text=Leather+Watch'],
        sizes: [],
        colors: ['#3f2c25'],
        tags: ['watches', 'analog', 'leather', 'men', 'classic'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-WAT-004'
    },

    // ── ACCESSORIES ───────────────────────────────────────
    {
        id: 'acc-1',
        name: 'Cat Printed Backpack',
        price: 1299,
        category: 'accessories',
        rating: 4.8,
        reviewCount: 156,
        description: 'Adorable cat print backpack. Spacious, durable, and incredibly cute. Perfect for school, college, or daily errands.',
        features: ['Waterproof Material', 'Laptop Compartment', 'Padded Straps', 'Side Bottle Pockets', 'Cute Design'],
        images: ['https://placehold.co/600x600/d8b4fe/5b21b6?text=Cat+Backpack'],
        sizes: [],
        colors: ['#000000', '#ec4899'],
        tags: ['accessories', 'backpack', 'cat', 'cute', 'bag', 'kawaii'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-ACC-001'
    },
    {
        id: 'acc-2',
        name: 'Cute Lamb Plush Bag',
        price: 899,
        category: 'accessories',
        rating: 4.9,
        reviewCount: 230,
        description: 'Soft and fluffy lamb plush bag. The perfect accessory for a kawaii aesthetic look.',
        features: ['Ultra Soft Plush', 'Zipper Closure', 'Detachable Strap', 'Lightweight', 'Kawaii Aesthetic'],
        images: ['https://placehold.co/600x600/d8b4fe/5b21b6?text=Lamb+Plush+Bag'],
        sizes: [],
        colors: ['#ffffff', '#fde8f3'],
        tags: ['accessories', 'bag', 'plush', 'cute', 'kawaii', 'lamb'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-ACC-002'
    },

    // ── ELECTRONICS ───────────────────────────────────────
    {
        id: 'elec-1',
        name: 'Wireless Headphones',
        price: 2999,
        category: 'electronics',
        rating: 4.4,
        reviewCount: 88,
        description: 'High-fidelity wireless headphones with active noise cancellation for truly immersive audio experiences.',
        features: ['Active Noise Cancellation', '30Hr Battery Life', 'Bluetooth 5.3', 'Built-in Mic', 'Foldable Design'],
        images: ['https://placehold.co/600x600/93c5fd/1e40af?text=Headphones'],
        sizes: [],
        colors: ['#000000', '#ffffff'],
        tags: ['electronics', 'headphones', 'wireless', 'bluetooth', 'audio', 'ANC'],
        isTrending: true,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-ELE-001'
    },
    {
        id: 'elec-2',
        name: 'Sonic Electric Toothbrush',
        price: 1499,
        category: 'electronics',
        rating: 4.5,
        reviewCount: 40,
        description: 'Advanced sonic electric toothbrush for superior dental hygiene. Three cleaning modes for a perfect clean.',
        features: ['Sonic Technology', '3 Cleaning Modes', 'Built-in 2 Min Timer', 'Long-lasting Battery', 'Waterproof IPX7'],
        images: ['https://placehold.co/600x600/93c5fd/1e40af?text=Electric+Brush'],
        sizes: [],
        colors: ['#3b82f6', '#ffffff'],
        tags: ['electronics', 'toothbrush', 'electric', 'dental', 'hygiene', 'sonic'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-ELE-002'
    },

    // ── HOME ESSENTIALS ───────────────────────────────────
    {
        id: 'home-1',
        name: 'Foldable Laundry Basket',
        price: 699,
        category: 'home',
        rating: 4.3,
        reviewCount: 112,
        description: 'Space-saving foldable laundry basket. Durable, breathable mesh design that stores flat when not in use.',
        features: ['Collapsible Design', '60L Large Capacity', 'Breathable Mesh', 'Sturdy Handles', 'Easy to Clean'],
        images: ['https://placehold.co/600x600/86efac/166534?text=Laundry+Basket'],
        sizes: [],
        colors: ['#9ca3af', '#d1d5db'],
        tags: ['home', 'laundry', 'basket', 'foldable', 'essentials', 'storage'],
        isTrending: false,
        shopifyLink: 'INSERT_SHOPIFY_LINK_HERE',
        sku: 'HK-HOM-001'
    },

    // ── BOTTLES ───────────────────────────────────────────
    {
        id: 'bottle-1',
        name: '2 in 1 Water Bottle 1000ml',
        price: 799,
        category: 'bottles',
        rating: 4.6,
        reviewCount: 75,
        description: 'Large capacity dual-use water bottle with straw and direct drink spout. Perfect for gym and travel.',
        features: ['1 Litre Capacity', 'Dual Drink Modes', 'Leak-proof Seal', 'BPA Free', 'Easy Grip Handle'],
        images: ['Bott.png', 'https://placehold.co/600x600/7dd3fc/0369a1?text=Side+View'],
        sizes: [],
        colors: ['#a855f7', '#22c55e'],
        tags: ['bottles', 'water bottle', 'gym', 'travel', '1000ml', 'dual use'],
        isTrending: true,
        shopifyLink: 'https://aqrrw7-x3.myshopify.com/products/2-in-1-water-bottle-for-hot-and-cold-drinks-with-double-straws-and-cover-1000-ml-bottle?variant=53265182097776',
        sku: 'HK-BOT-001'
    },
    {
        id: 'bottle-2',
        name: '700ml Kawaii Water Bottle',
        price: 599,
        category: 'bottles',
        rating: 4.8,
        reviewCount: 144,
        description: 'Cute aesthetic water bottle with lid and straw. Comes with stickers. A must-have for students.',
        features: ['700ml Capacity', 'Kawaii Design', 'Stickers Included', 'Straw Sipper', 'Carry Strap'],
        images: ['Bottle.png', 'https://placehold.co/600x600/7dd3fc/0369a1?text=Kawaii+Bottle'],
        sizes: [],
        colors: ['#f472b6', '#a78bfa'],
        tags: ['bottles', 'kawaii', 'cute', 'water bottle', 'students', 'aesthetic'],
        isTrending: true,
        shopifyLink: 'https://aqrrw7-x3.myshopify.com/products/700ml-kawaii-water-bottle-with-lid-and-straw?variant=53261258981744',
        sku: 'HK-BOT-002'
    },
    {
        id: 'bottle-3',
        name: 'Over Glass Water Bottle with Straw',
        price: 499,
        category: 'bottles',
        rating: 4.5,
        reviewCount: 75,
        description: 'Stylish borosilicate glass water bottle with straw. Durable, eco-friendly and perfect for daily use.',
        features: ['Borosilicate Glass', 'Straw Included', 'Leak-proof', 'Heat Resistant', 'Eco-friendly'],
        images: ['bot3.png', 'https://placehold.co/600x600/7dd3fc/0369a1?text=Glass+Bottle'],
        sizes: [],
        colors: ['#6ee7b7', '#93c5fd'],
        tags: ['bottles', 'glass bottle', 'straw', 'eco-friendly', 'daily use'],
        isTrending: false,
        shopifyLink: 'https://aqrrw7-x3.myshopify.com/products/over-glass-water-bottle-with-straw?variant=53265182065008',
        sku: 'HK-BOT-003'
    }
];

// Helper: get product by ID
function getProductById(id) {
    return products.find(p => p.id === id) || null;
}

// Helper: get unique categories in display order
function getCategories() {
    const order = Object.keys(categoryMeta);
    return [...new Set(products.map(p => p.category))].sort(
        (a, b) => order.indexOf(a) - order.indexOf(b)
    );
}
