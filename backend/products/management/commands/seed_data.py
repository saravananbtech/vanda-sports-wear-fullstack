import os
from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from categories.models import Category, Subcategory
from products.models import Product, ProductImage
from customization.models import Package
from offers.models import Offer

# Explicit slugs (not auto-slugified) so routes match the required scheme,
# e.g. /category/tshirts/printed rather than /category/t-shirts/printed-t-shirts.
CATEGORY_DATA = [
    {
        'name': 'T-Shirts', 'slug': 'tshirts',
        'gradient': 'linear-gradient(150deg,#241f13,#0f0d08)', 'icon': 'shirt', 'image_file': 'cat-tshirts.jpg',
        'subcats': [
            {'name': 'Printed T-Shirts', 'slug': 'printed'},
            {'name': 'Collar / Polo T-Shirts', 'slug': 'collar'},
            {'name': 'Plain T-Shirts', 'slug': 'plain'},
            {'name': 'Jersey T-Shirts', 'slug': 'jersey'},
            {'name': 'Sports T-Shirts', 'slug': 'sports'},
        ],
    },
    {
        'name': 'Track Pants', 'slug': 'trackpants',
        'gradient': 'linear-gradient(150deg,#231d10,#100d07)', 'icon': 'pants', 'image_file': 'cat-trackpants.jpg',
        'subcats': [
            {'name': 'Regular Track Pants', 'slug': 'regular'},
            {'name': 'Slim Fit Track Pants', 'slug': 'slimfit'},
            {'name': 'Training Track Pants', 'slug': 'training'},
            {'name': 'Running Track Pants', 'slug': 'running'},
            {'name': 'Jogger Track Pants', 'slug': 'jogger'},
        ],
    },
    {
        'name': 'Shorts', 'slug': 'shorts',
        'gradient': 'linear-gradient(150deg,#241e12,#0f0d07)', 'icon': 'shorts', 'image_file': 'cat-shorts.jpg',
        'subcats': [
            {'name': 'Sports Shorts', 'slug': 'sports'},
            {'name': 'Running Shorts', 'slug': 'running'},
            {'name': 'Training Shorts', 'slug': 'training'},
            {'name': 'Gym Shorts', 'slug': 'gym'},
            {'name': 'Casual Shorts', 'slug': 'casual'},
        ],
    },
    {
        'name': 'Jackets', 'slug': 'jackets',
        'gradient': 'linear-gradient(150deg,#221c10,#0e0c07)', 'icon': 'jacket', 'image_file': 'cat-jackets.jpg',
        'subcats': [
            {'name': 'Sports Jackets', 'slug': 'sports'},
            {'name': 'Training Jackets', 'slug': 'training'},
            {'name': 'Running Jackets', 'slug': 'running'},
            {'name': 'Windcheaters', 'slug': 'windcheaters'},
            {'name': 'Track Jackets', 'slug': 'track'},
        ],
    },
]

# 5 colourway products per subcategory (100 total). Each colourway uses its own
# image from seed_assets/, so products inside one subcategory look different.
PRODUCT_DATA = [
    {'name': 'Graphic Print Performance Tee — Black/Gold', 'cat': 'T-Shirts', 'sub': 'Printed T-Shirts', 'price': 649, 'compare': 849, 'tag': 'New', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-tshirts-gold.jpg', 'desc': 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Black/Gold.'},
    {'name': 'Graphic Print Performance Tee — Crimson Red', 'cat': 'T-Shirts', 'sub': 'Printed T-Shirts', 'price': 649, 'compare': 849, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-tshirts-red.jpg', 'desc': 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Crimson Red.'},
    {'name': 'Graphic Print Performance Tee — Royal Blue', 'cat': 'T-Shirts', 'sub': 'Printed T-Shirts', 'price': 649, 'compare': 849, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-tshirts-blue.jpg', 'desc': 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Royal Blue.'},
    {'name': 'Graphic Print Performance Tee — Racing Green', 'cat': 'T-Shirts', 'sub': 'Printed T-Shirts', 'price': 649, 'compare': 849, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-tshirts-green.jpg', 'desc': 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Racing Green.'},
    {'name': 'Graphic Print Performance Tee — Platinum White', 'cat': 'T-Shirts', 'sub': 'Printed T-Shirts', 'price': 649, 'compare': 849, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-tshirts-white.jpg', 'desc': 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Platinum White.'},
    {'name': 'Ribbed Collar Polo Tee — Black/Gold', 'cat': 'T-Shirts', 'sub': 'Collar / Polo T-Shirts', 'price': 699, 'compare': 899, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.6, 'image_file': 'cat-tshirts-gold.jpg', 'desc': 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Black/Gold.'},
    {'name': 'Ribbed Collar Polo Tee — Crimson Red', 'cat': 'T-Shirts', 'sub': 'Collar / Polo T-Shirts', 'price': 699, 'compare': 899, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-tshirts-red.jpg', 'desc': 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Crimson Red.'},
    {'name': 'Ribbed Collar Polo Tee — Royal Blue', 'cat': 'T-Shirts', 'sub': 'Collar / Polo T-Shirts', 'price': 699, 'compare': 899, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.7, 'image_file': 'cat-tshirts-blue.jpg', 'desc': 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Royal Blue.'},
    {'name': 'Ribbed Collar Polo Tee — Racing Green', 'cat': 'T-Shirts', 'sub': 'Collar / Polo T-Shirts', 'price': 699, 'compare': 899, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.4, 'image_file': 'cat-tshirts-green.jpg', 'desc': 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Racing Green.'},
    {'name': 'Ribbed Collar Polo Tee — Platinum White', 'cat': 'T-Shirts', 'sub': 'Collar / Polo T-Shirts', 'price': 699, 'compare': 899, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-tshirts-white.jpg', 'desc': 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Platinum White.'},
    {'name': 'Essential Plain Cotton Tee — Black/Gold', 'cat': 'T-Shirts', 'sub': 'Plain T-Shirts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.4, 'image_file': 'cat-tshirts-gold.jpg', 'desc': 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Black/Gold.'},
    {'name': 'Essential Plain Cotton Tee — Crimson Red', 'cat': 'T-Shirts', 'sub': 'Plain T-Shirts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.3, 'image_file': 'cat-tshirts-red.jpg', 'desc': 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Crimson Red.'},
    {'name': 'Essential Plain Cotton Tee — Royal Blue', 'cat': 'T-Shirts', 'sub': 'Plain T-Shirts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-tshirts-blue.jpg', 'desc': 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Royal Blue.'},
    {'name': 'Essential Plain Cotton Tee — Racing Green', 'cat': 'T-Shirts', 'sub': 'Plain T-Shirts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.2, 'image_file': 'cat-tshirts-green.jpg', 'desc': 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Racing Green.'},
    {'name': 'Essential Plain Cotton Tee — Platinum White', 'cat': 'T-Shirts', 'sub': 'Plain T-Shirts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.3, 'image_file': 'cat-tshirts-white.jpg', 'desc': 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Platinum White.'},
    {'name': 'Sublimation Home Jersey — Black/Gold', 'cat': 'T-Shirts', 'sub': 'Jersey T-Shirts', 'price': 849, 'compare': 1099, 'tag': 'Best Seller', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.8, 'image_file': 'cat-tshirts-gold.jpg', 'desc': 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Black/Gold.'},
    {'name': 'Sublimation Home Jersey — Crimson Red', 'cat': 'T-Shirts', 'sub': 'Jersey T-Shirts', 'price': 849, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-tshirts-red.jpg', 'desc': 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Crimson Red.'},
    {'name': 'Sublimation Home Jersey — Royal Blue', 'cat': 'T-Shirts', 'sub': 'Jersey T-Shirts', 'price': 849, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.9, 'image_file': 'cat-tshirts-blue.jpg', 'desc': 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Royal Blue.'},
    {'name': 'Sublimation Home Jersey — Racing Green', 'cat': 'T-Shirts', 'sub': 'Jersey T-Shirts', 'price': 849, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-tshirts-green.jpg', 'desc': 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Racing Green.'},
    {'name': 'Sublimation Home Jersey — Platinum White', 'cat': 'T-Shirts', 'sub': 'Jersey T-Shirts', 'price': 849, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-tshirts-white.jpg', 'desc': 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Platinum White.'},
    {'name': 'Basketball Sports Tee — Black/Gold', 'cat': 'T-Shirts', 'sub': 'Sports T-Shirts', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-tshirts-gold.jpg', 'desc': 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Black/Gold.'},
    {'name': 'Basketball Sports Tee — Crimson Red', 'cat': 'T-Shirts', 'sub': 'Sports T-Shirts', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-tshirts-red.jpg', 'desc': 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Crimson Red.'},
    {'name': 'Basketball Sports Tee — Royal Blue', 'cat': 'T-Shirts', 'sub': 'Sports T-Shirts', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-tshirts-blue.jpg', 'desc': 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Royal Blue.'},
    {'name': 'Basketball Sports Tee — Racing Green', 'cat': 'T-Shirts', 'sub': 'Sports T-Shirts', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-tshirts-green.jpg', 'desc': 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Racing Green.'},
    {'name': 'Basketball Sports Tee — Platinum White', 'cat': 'T-Shirts', 'sub': 'Sports T-Shirts', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-tshirts-white.jpg', 'desc': 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Platinum White.'},
    {'name': 'Regular Fit Track Pant — Black/Gold', 'cat': 'Track Pants', 'sub': 'Regular Track Pants', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-gold.jpg', 'desc': 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Black/Gold.'},
    {'name': 'Regular Fit Track Pant — Crimson Red', 'cat': 'Track Pants', 'sub': 'Regular Track Pants', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-trackpants-red.jpg', 'desc': 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Crimson Red.'},
    {'name': 'Regular Fit Track Pant — Royal Blue', 'cat': 'Track Pants', 'sub': 'Regular Track Pants', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-blue.jpg', 'desc': 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Royal Blue.'},
    {'name': 'Regular Fit Track Pant — Racing Green', 'cat': 'Track Pants', 'sub': 'Regular Track Pants', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.2, 'image_file': 'cat-trackpants-green.jpg', 'desc': 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Racing Green.'},
    {'name': 'Regular Fit Track Pant — Platinum White', 'cat': 'Track Pants', 'sub': 'Regular Track Pants', 'price': 799, 'compare': 999, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-trackpants-white.jpg', 'desc': 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Platinum White.'},
    {'name': 'Slim Fit Track Pant — Black/Gold', 'cat': 'Track Pants', 'sub': 'Slim Fit Track Pants', 'price': 899, 'compare': 1099, 'tag': 'New', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-gold.jpg', 'desc': 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Black/Gold.'},
    {'name': 'Slim Fit Track Pant — Crimson Red', 'cat': 'Track Pants', 'sub': 'Slim Fit Track Pants', 'price': 899, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-red.jpg', 'desc': 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Crimson Red.'},
    {'name': 'Slim Fit Track Pant — Royal Blue', 'cat': 'Track Pants', 'sub': 'Slim Fit Track Pants', 'price': 899, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-trackpants-blue.jpg', 'desc': 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Royal Blue.'},
    {'name': 'Slim Fit Track Pant — Racing Green', 'cat': 'Track Pants', 'sub': 'Slim Fit Track Pants', 'price': 899, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-trackpants-green.jpg', 'desc': 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Racing Green.'},
    {'name': 'Slim Fit Track Pant — Platinum White', 'cat': 'Track Pants', 'sub': 'Slim Fit Track Pants', 'price': 899, 'compare': 1099, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-white.jpg', 'desc': 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Platinum White.'},
    {'name': 'Training Track Pant — Black/Gold', 'cat': 'Track Pants', 'sub': 'Training Track Pants', 'price': 999, 'compare': 1249, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-trackpants-gold.jpg', 'desc': 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Black/Gold.'},
    {'name': 'Training Track Pant — Crimson Red', 'cat': 'Track Pants', 'sub': 'Training Track Pants', 'price': 999, 'compare': 1249, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-red.jpg', 'desc': 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Crimson Red.'},
    {'name': 'Training Track Pant — Royal Blue', 'cat': 'Track Pants', 'sub': 'Training Track Pants', 'price': 999, 'compare': 1249, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-trackpants-blue.jpg', 'desc': 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Royal Blue.'},
    {'name': 'Training Track Pant — Racing Green', 'cat': 'Track Pants', 'sub': 'Training Track Pants', 'price': 999, 'compare': 1249, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-green.jpg', 'desc': 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Racing Green.'},
    {'name': 'Training Track Pant — Platinum White', 'cat': 'Track Pants', 'sub': 'Training Track Pants', 'price': 999, 'compare': 1249, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-white.jpg', 'desc': 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Platinum White.'},
    {'name': 'Four-Way Lycra Running Track Pant — Black/Gold', 'cat': 'Track Pants', 'sub': 'Running Track Pants', 'price': 1099, 'compare': 1399, 'tag': 'Best Seller', 'sizes': ['M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-trackpants-gold.jpg', 'desc': 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Black/Gold.'},
    {'name': 'Four-Way Lycra Running Track Pant — Crimson Red', 'cat': 'Track Pants', 'sub': 'Running Track Pants', 'price': 1099, 'compare': 1399, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-trackpants-red.jpg', 'desc': 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Crimson Red.'},
    {'name': 'Four-Way Lycra Running Track Pant — Royal Blue', 'cat': 'Track Pants', 'sub': 'Running Track Pants', 'price': 1099, 'compare': 1399, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.8, 'image_file': 'cat-trackpants-blue.jpg', 'desc': 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Royal Blue.'},
    {'name': 'Four-Way Lycra Running Track Pant — Racing Green', 'cat': 'Track Pants', 'sub': 'Running Track Pants', 'price': 1099, 'compare': 1399, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-green.jpg', 'desc': 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Racing Green.'},
    {'name': 'Four-Way Lycra Running Track Pant — Platinum White', 'cat': 'Track Pants', 'sub': 'Running Track Pants', 'price': 1099, 'compare': 1399, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-trackpants-white.jpg', 'desc': 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Platinum White.'},
    {'name': 'Jogger Track Pant — Black/Gold', 'cat': 'Track Pants', 'sub': 'Jogger Track Pants', 'price': 849, 'compare': 1049, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-trackpants-gold.jpg', 'desc': 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Black/Gold.'},
    {'name': 'Jogger Track Pant — Crimson Red', 'cat': 'Track Pants', 'sub': 'Jogger Track Pants', 'price': 849, 'compare': 1049, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-red.jpg', 'desc': 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Crimson Red.'},
    {'name': 'Jogger Track Pant — Royal Blue', 'cat': 'Track Pants', 'sub': 'Jogger Track Pants', 'price': 849, 'compare': 1049, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-trackpants-blue.jpg', 'desc': 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Royal Blue.'},
    {'name': 'Jogger Track Pant — Racing Green', 'cat': 'Track Pants', 'sub': 'Jogger Track Pants', 'price': 849, 'compare': 1049, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-trackpants-green.jpg', 'desc': 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Racing Green.'},
    {'name': 'Jogger Track Pant — Platinum White', 'cat': 'Track Pants', 'sub': 'Jogger Track Pants', 'price': 849, 'compare': 1049, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-trackpants-white.jpg', 'desc': 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Platinum White.'},
    {'name': 'All-Purpose Sports Shorts — Black/Gold', 'cat': 'Shorts', 'sub': 'Sports Shorts', 'price': 549, 'compare': 699, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-shorts-gold.jpg', 'desc': 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Black/Gold.'},
    {'name': 'All-Purpose Sports Shorts — Crimson Red', 'cat': 'Shorts', 'sub': 'Sports Shorts', 'price': 549, 'compare': 699, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-red.jpg', 'desc': 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Crimson Red.'},
    {'name': 'All-Purpose Sports Shorts — Royal Blue', 'cat': 'Shorts', 'sub': 'Sports Shorts', 'price': 549, 'compare': 699, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-shorts-blue.jpg', 'desc': 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Royal Blue.'},
    {'name': 'All-Purpose Sports Shorts — Racing Green', 'cat': 'Shorts', 'sub': 'Sports Shorts', 'price': 549, 'compare': 699, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.2, 'image_file': 'cat-shorts-green.jpg', 'desc': 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Racing Green.'},
    {'name': 'All-Purpose Sports Shorts — Platinum White', 'cat': 'Shorts', 'sub': 'Sports Shorts', 'price': 549, 'compare': 699, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-white.jpg', 'desc': 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Platinum White.'},
    {'name': 'Lightweight Running Shorts — Black/Gold', 'cat': 'Shorts', 'sub': 'Running Shorts', 'price': 499, 'compare': 649, 'tag': 'New', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-shorts-gold.jpg', 'desc': 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Black/Gold.'},
    {'name': 'Lightweight Running Shorts — Crimson Red', 'cat': 'Shorts', 'sub': 'Running Shorts', 'price': 499, 'compare': 649, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-shorts-red.jpg', 'desc': 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Crimson Red.'},
    {'name': 'Lightweight Running Shorts — Royal Blue', 'cat': 'Shorts', 'sub': 'Running Shorts', 'price': 499, 'compare': 649, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-shorts-blue.jpg', 'desc': 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Royal Blue.'},
    {'name': 'Lightweight Running Shorts — Racing Green', 'cat': 'Shorts', 'sub': 'Running Shorts', 'price': 499, 'compare': 649, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-green.jpg', 'desc': 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Racing Green.'},
    {'name': 'Lightweight Running Shorts — Platinum White', 'cat': 'Shorts', 'sub': 'Running Shorts', 'price': 499, 'compare': 649, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-shorts-white.jpg', 'desc': 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Platinum White.'},
    {'name': 'Training Shorts — Black/Gold', 'cat': 'Shorts', 'sub': 'Training Shorts', 'price': 579, 'compare': 729, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-shorts-gold.jpg', 'desc': 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Black/Gold.'},
    {'name': 'Training Shorts — Crimson Red', 'cat': 'Shorts', 'sub': 'Training Shorts', 'price': 579, 'compare': 729, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-red.jpg', 'desc': 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Crimson Red.'},
    {'name': 'Training Shorts — Royal Blue', 'cat': 'Shorts', 'sub': 'Training Shorts', 'price': 579, 'compare': 729, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-shorts-blue.jpg', 'desc': 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Royal Blue.'},
    {'name': 'Training Shorts — Racing Green', 'cat': 'Shorts', 'sub': 'Training Shorts', 'price': 579, 'compare': 729, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.2, 'image_file': 'cat-shorts-green.jpg', 'desc': 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Racing Green.'},
    {'name': 'Training Shorts — Platinum White', 'cat': 'Shorts', 'sub': 'Training Shorts', 'price': 579, 'compare': 729, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-white.jpg', 'desc': 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Platinum White.'},
    {'name': 'Gym Shorts — Black/Gold', 'cat': 'Shorts', 'sub': 'Gym Shorts', 'price': 529, 'compare': 679, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.3, 'image_file': 'cat-shorts-gold.jpg', 'desc': 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Black/Gold.'},
    {'name': 'Gym Shorts — Crimson Red', 'cat': 'Shorts', 'sub': 'Gym Shorts', 'price': 529, 'compare': 679, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.2, 'image_file': 'cat-shorts-red.jpg', 'desc': 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Crimson Red.'},
    {'name': 'Gym Shorts — Royal Blue', 'cat': 'Shorts', 'sub': 'Gym Shorts', 'price': 529, 'compare': 679, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.4, 'image_file': 'cat-shorts-blue.jpg', 'desc': 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Royal Blue.'},
    {'name': 'Gym Shorts — Racing Green', 'cat': 'Shorts', 'sub': 'Gym Shorts', 'price': 529, 'compare': 679, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.1, 'image_file': 'cat-shorts-green.jpg', 'desc': 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Racing Green.'},
    {'name': 'Gym Shorts — Platinum White', 'cat': 'Shorts', 'sub': 'Gym Shorts', 'price': 529, 'compare': 679, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'rating': 4.2, 'image_file': 'cat-shorts-white.jpg', 'desc': 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Platinum White.'},
    {'name': 'Casual Sport Shorts — Black/Gold', 'cat': 'Shorts', 'sub': 'Casual Shorts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-shorts-gold.jpg', 'desc': 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Black/Gold.'},
    {'name': 'Casual Sport Shorts — Crimson Red', 'cat': 'Shorts', 'sub': 'Casual Shorts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.2, 'image_file': 'cat-shorts-red.jpg', 'desc': 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Crimson Red.'},
    {'name': 'Casual Sport Shorts — Royal Blue', 'cat': 'Shorts', 'sub': 'Casual Shorts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-shorts-blue.jpg', 'desc': 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Royal Blue.'},
    {'name': 'Casual Sport Shorts — Racing Green', 'cat': 'Shorts', 'sub': 'Casual Shorts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.1, 'image_file': 'cat-shorts-green.jpg', 'desc': 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Racing Green.'},
    {'name': 'Casual Sport Shorts — Platinum White', 'cat': 'Shorts', 'sub': 'Casual Shorts', 'price': 449, 'compare': 599, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.2, 'image_file': 'cat-shorts-white.jpg', 'desc': 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Platinum White.'},
    {'name': 'Sports Jacket — Black/Gold', 'cat': 'Jackets', 'sub': 'Sports Jackets', 'price': 1699, 'compare': 2199, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.6, 'image_file': 'cat-jackets-gold.jpg', 'desc': 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Black/Gold.'},
    {'name': 'Sports Jacket — Crimson Red', 'cat': 'Jackets', 'sub': 'Sports Jackets', 'price': 1699, 'compare': 2199, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-jackets-red.jpg', 'desc': 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Crimson Red.'},
    {'name': 'Sports Jacket — Royal Blue', 'cat': 'Jackets', 'sub': 'Sports Jackets', 'price': 1699, 'compare': 2199, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.7, 'image_file': 'cat-jackets-blue.jpg', 'desc': 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Royal Blue.'},
    {'name': 'Sports Jacket — Racing Green', 'cat': 'Jackets', 'sub': 'Sports Jackets', 'price': 1699, 'compare': 2199, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.4, 'image_file': 'cat-jackets-green.jpg', 'desc': 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Racing Green.'},
    {'name': 'Sports Jacket — Platinum White', 'cat': 'Jackets', 'sub': 'Sports Jackets', 'price': 1699, 'compare': 2199, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-jackets-white.jpg', 'desc': 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Platinum White.'},
    {'name': 'Training Jacket — Black/Gold', 'cat': 'Jackets', 'sub': 'Training Jackets', 'price': 1799, 'compare': 2299, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-jackets-gold.jpg', 'desc': 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Black/Gold.'},
    {'name': 'Training Jacket — Crimson Red', 'cat': 'Jackets', 'sub': 'Training Jackets', 'price': 1799, 'compare': 2299, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-jackets-red.jpg', 'desc': 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Crimson Red.'},
    {'name': 'Training Jacket — Royal Blue', 'cat': 'Jackets', 'sub': 'Training Jackets', 'price': 1799, 'compare': 2299, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-jackets-blue.jpg', 'desc': 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Royal Blue.'},
    {'name': 'Training Jacket — Racing Green', 'cat': 'Jackets', 'sub': 'Training Jackets', 'price': 1799, 'compare': 2299, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.3, 'image_file': 'cat-jackets-green.jpg', 'desc': 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Racing Green.'},
    {'name': 'Training Jacket — Platinum White', 'cat': 'Jackets', 'sub': 'Training Jackets', 'price': 1799, 'compare': 2299, 'tag': '', 'sizes': ['M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-jackets-white.jpg', 'desc': 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Platinum White.'},
    {'name': 'Running Jacket — Black/Gold', 'cat': 'Jackets', 'sub': 'Running Jackets', 'price': 1899, 'compare': 2399, 'tag': 'New', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.6, 'image_file': 'cat-jackets-gold.jpg', 'desc': 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Black/Gold.'},
    {'name': 'Running Jacket — Crimson Red', 'cat': 'Jackets', 'sub': 'Running Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-jackets-red.jpg', 'desc': 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Crimson Red.'},
    {'name': 'Running Jacket — Royal Blue', 'cat': 'Jackets', 'sub': 'Running Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.7, 'image_file': 'cat-jackets-blue.jpg', 'desc': 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Royal Blue.'},
    {'name': 'Running Jacket — Racing Green', 'cat': 'Jackets', 'sub': 'Running Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.4, 'image_file': 'cat-jackets-green.jpg', 'desc': 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Racing Green.'},
    {'name': 'Running Jacket — Platinum White', 'cat': 'Jackets', 'sub': 'Running Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['S', 'M', 'L', 'XL'], 'rating': 4.5, 'image_file': 'cat-jackets-white.jpg', 'desc': 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Platinum White.'},
    {'name': 'Windcheater — Black/Gold', 'cat': 'Jackets', 'sub': 'Windcheaters', 'price': 1499, 'compare': 1899, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.4, 'image_file': 'cat-jackets-gold.jpg', 'desc': 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Black/Gold.'},
    {'name': 'Windcheater — Crimson Red', 'cat': 'Jackets', 'sub': 'Windcheaters', 'price': 1499, 'compare': 1899, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.3, 'image_file': 'cat-jackets-red.jpg', 'desc': 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Crimson Red.'},
    {'name': 'Windcheater — Royal Blue', 'cat': 'Jackets', 'sub': 'Windcheaters', 'price': 1499, 'compare': 1899, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.5, 'image_file': 'cat-jackets-blue.jpg', 'desc': 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Royal Blue.'},
    {'name': 'Windcheater — Racing Green', 'cat': 'Jackets', 'sub': 'Windcheaters', 'price': 1499, 'compare': 1899, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.2, 'image_file': 'cat-jackets-green.jpg', 'desc': 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Racing Green.'},
    {'name': 'Windcheater — Platinum White', 'cat': 'Jackets', 'sub': 'Windcheaters', 'price': 1499, 'compare': 1899, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.3, 'image_file': 'cat-jackets-white.jpg', 'desc': 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Platinum White.'},
    {'name': 'Hooded Sports Track Jacket — Black/Gold', 'cat': 'Jackets', 'sub': 'Track Jackets', 'price': 1899, 'compare': 2399, 'tag': 'Best Seller', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.9, 'image_file': 'cat-jackets-gold.jpg', 'desc': 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Black/Gold.'},
    {'name': 'Hooded Sports Track Jacket — Crimson Red', 'cat': 'Jackets', 'sub': 'Track Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.8, 'image_file': 'cat-jackets-red.jpg', 'desc': 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Crimson Red.'},
    {'name': 'Hooded Sports Track Jacket — Royal Blue', 'cat': 'Jackets', 'sub': 'Track Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 5.0, 'image_file': 'cat-jackets-blue.jpg', 'desc': 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Royal Blue.'},
    {'name': 'Hooded Sports Track Jacket — Racing Green', 'cat': 'Jackets', 'sub': 'Track Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.7, 'image_file': 'cat-jackets-green.jpg', 'desc': 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Racing Green.'},
    {'name': 'Hooded Sports Track Jacket — Platinum White', 'cat': 'Jackets', 'sub': 'Track Jackets', 'price': 1899, 'compare': 2399, 'tag': '', 'sizes': ['M', 'L', 'XL', 'XXL'], 'rating': 4.8, 'image_file': 'cat-jackets-white.jpg', 'desc': 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Platinum White.'},
]

PACKAGE_DATA = [
    {'name': 'Single Side Sublimation Jersey', 'includes': 'Jersey Only', 'price': 260, 'badge': ''},
    {'name': 'Double Side Sublimation Jersey', 'includes': 'Jersey Only', 'price': 300, 'badge': ''},
    {'name': 'Double Side Jersey + Sublimation Shorts', 'includes': 'Full Set', 'price': 520, 'badge': 'Popular'},
    {'name': 'Premium Double Side Set', 'includes': 'Double Jersey + Double Sublimation Shorts', 'price': 540, 'badge': ''},
    {'name': 'Single Side Set', 'includes': 'Jersey + Normal Shorts', 'price': 380, 'badge': ''},
    {'name': 'Double Side Jersey + NS Fabric Shorts', 'includes': 'Jersey + NS Fabric Shorts', 'price': 450, 'badge': ''},
    {'name': 'Single Side Polo + NS Fabric Shorts', 'includes': 'Polo + NS Fabric Shorts', 'price': 410, 'badge': ''},
    {'name': 'Tracksuit', 'includes': 'Upper + Lower', 'price': 750, 'badge': ''},
    {'name': 'Full Team Kit', 'includes': 'Jersey, Shorts, Tracksuit, Bag, Bottle', 'price': 1450, 'badge': 'Best Value'},
]

OFFER_DATA = [
    {'code': 'VANDA10', 'description': '10% off on your first order', 'discount_percent': 10},
    {'code': 'TEAM40', 'description': 'Up to 40% off on bulk team kits', 'discount_percent': 40},
    {'code': 'FREESHIP', 'description': 'Free delivery on orders above ₹2000', 'discount_percent': 0},
]


class Command(BaseCommand):
    help = 'Seeds the database with the full category/subcategory/product structure.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset', action='store_true',
            help='Delete all existing categories/subcategories/products/packages/offers before seeding. '
                 'Use this if you previously seeded an older version of this data (e.g. different slugs) '
                 'and are seeing duplicate or stale categories.',
        )

    def handle(self, *args, **options):
        if options['reset']:
            Product.objects.all().delete()
            Subcategory.objects.all().delete()
            Category.objects.all().delete()
            Package.objects.all().delete()
            Offer.objects.all().delete()
            self.stdout.write(self.style.WARNING('--reset: cleared existing categories/products/packages/offers.'))

        seed_assets_dir = os.path.join(os.path.dirname(__file__), 'seed_assets')

        cat_objs = {}
        for c in CATEGORY_DATA:
            # Keyed on `name` (unique on the model) rather than `slug`, so
            # re-running this after a slug scheme changes updates the
            # existing row in place instead of crashing on a duplicate
            # `name` or leaving old and new categories both in the DB.
            cat, created = Category.objects.update_or_create(
                name=c['name'],
                defaults={'slug': c['slug'], 'gradient': c['gradient'], 'icon': c['icon']},
            )
            # Only set the seed image on creation, or if the category has no
            # image yet — never overwrites an image an admin has since
            # uploaded/replaced through the admin panel.
            image_file = c.get('image_file')
            if image_file and (created or not cat.image):
                path = os.path.join(seed_assets_dir, image_file)
                if os.path.exists(path):
                    with open(path, 'rb') as f:
                        cat.image.save(image_file, File(f), save=True)
            cat_objs[c['name']] = cat
            for sub in c['subcats']:
                Subcategory.objects.update_or_create(
                    category=cat, name=sub['name'], defaults={'slug': sub['slug']},
                )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(CATEGORY_DATA)} categories.'))

        sub_count = sum(len(c['subcats']) for c in CATEGORY_DATA)
        self.stdout.write(self.style.SUCCESS(f'Seeded {sub_count} subcategories.'))

        for p in PRODUCT_DATA:
            cat = cat_objs[p['cat']]
            sub = Subcategory.objects.filter(category=cat, name=p['sub']).first()
            product, _ = Product.objects.update_or_create(
                name=p['name'],
                defaults={
                    'slug': slugify(p['name']),
                    'category': cat, 'subcategory': sub,
                    'description': p['desc'], 'price': p['price'], 'compare_at_price': p['compare'],
                    'sizes': p['sizes'], 'tag': p['tag'], 'rating': p['rating'],
                },
            )
            # Each product gets its own colourway photo (never overwrites an
            # image you later upload through the admin panel).
            if not product.images.filter(is_primary=True).exists():
                image_file = p['image_file']
                path = os.path.join(seed_assets_dir, image_file)
                if os.path.exists(path):
                    with open(path, 'rb') as f:
                        ProductImage.objects.create(
                            product=product, image=File(f, name=image_file),
                            is_primary=True, alt_text=product.name,
                        )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(PRODUCT_DATA)} products.'))

        for pkg in PACKAGE_DATA:
            Package.objects.update_or_create(name=pkg['name'], defaults=pkg)
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(PACKAGE_DATA)} jersey packages.'))

        for offer in OFFER_DATA:
            Offer.objects.update_or_create(code=offer['code'], defaults=offer)
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(OFFER_DATA)} offers.'))

        self.stdout.write(self.style.SUCCESS('Done. Run createsuperuser to access /admin/.'))
