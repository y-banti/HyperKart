# Product Detail Pages - The Imperial Store

## 📁 Directory Structure

All individual product pages are located in the `/products/` folder.

Each product has its own HTML file with complete details, images, and reviews.

---

## 📦 Available Product Pages

### Clothing
1. **printed-coord-set.html** - Printed Co-ord Set (S M L XL) - ₹1,499
2. **combo-stylish-pants.html** - Combo Stylish Pants - ₹1,899
3. **combo-cotton-shorts.html** - Combo Cotton Shorts - ₹999
4. **combo-stretchable-shorts.html** - Combo Stretchable Shorts - ₹1,199
5. **combo-4-stretchable-shorts.html** - Combo 4 Stretchable Shorts - ₹1,799
6. **brown-cargo-trouser.html** - Brown Cargo Trouser - ₹1,599

### Watches
7. **casio-vintage-gold-watch.html** - Casio Vintage Digital Gold Watch - ₹3,499
8. **luxury-stainless-steel-watch.html** - Luxury Stainless Steel Watch - ₹8,999
9. **men-silver-strap-watch.html** - Men Silver Strap Watch - ₹2,799
10. **men-analog-leather-watch.html** - Men's Analog Leather Watch - ₹3,299

### Accessories
11. **cat-printed-backpack.html** - Cat Printed Backpack - ₹1,299
12. **cute-lamb-plush-bag.html** - Cute Lamb Plush Bag - ₹899

### Electronics
13. **wireless-headphones.html** - Wireless Headphones - ₹2,999
14. **electric-toothbrush.html** - Electric Toothbrush - ₹1,499

### Home Essentials
15. **foldable-laundry-basket.html** - Foldable Laundry Basket - ₹699

### Bottles
16. **2in1-water-bottle-1000ml.html** - 2 in 1 Water Bottle 1000ml - ₹799
17. **kawaii-water-bottle-700ml.html** - 700ml Kawaii Water Bottle - ₹599

---

## 🔗 How to Link Products

### From Homepage to Product Page

Update each product card's buttons to link to the specific product page:

```html
<div class="product-actions">
    <a href="products/printed-coord-set.html" class="btn-buy">Buy</a>
    <a href="products/printed-coord-set.html" class="btn-details">See Details</a>
</div>
```

---

## 📄 Product Page Features

Each product detail page includes:

✅ **Product Images**
- Main large image (600x600)
- 4 thumbnail images
- Click to change main image

✅ **Product Information**
- Product title
- Star rating
- Price
- Detailed description
- Key features list

✅ **Product Options**
- Size selector (where applicable)
- Color selector
- Interactive selection

✅ **Action Buttons**
- Buy Now (primary)
- Add to Cart (secondary)

✅ **Product Meta**
- SKU number
- Category
- Tags

✅ **Customer Reviews**
- Overall rating summary
- Rating breakdown with bars
- Individual review cards
- Helpful voting buttons

---

## 🎨 Design Consistency

All product pages use:
- Professional color palette (Navy #0F172A, Blue #2563EB)
- Poppins + Inter typography
- Clean white backgrounds
- Subtle borders and shadows
- Responsive layout

---

## 📝 To Create More Product Pages

1. Copy an existing product page
2. Update the product-specific information:
   - Title and meta description
   - Product name
   - Price
   - Description
   - Features
   - SKU and category
   - Review count and ratings
3. Replace image placeholders
4. Update the filename
5. Link from homepage

---

## ✅ Current Status

**Created**: 1 product page (Printed Co-ord Set)
**Remaining**: 16 product pages

You can create the remaining pages by following the same template structure.

---

## 🚀 Quick Start

To view a product detail page:
1. Open `products/printed-coord-set.html` in your browser
2. Or click "See Details" on any product from the homepage (once links are updated)

---

**Note**: Remember to update the homepage links to point to the correct product page files in the `/products/` folder.
