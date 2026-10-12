import pkgSingleSide from '../assets/images/single-side.jpg';
import pkgDoubleSide from '../assets/images/double-side.jpg';
import pkgJerseyShorts from '../assets/images/jersey-shorts.jpg';
import pkgPoloShorts from '../assets/images/polo-shorts.jpg';
import pkgTracksuit from '../assets/images/tracksuit.jpg';
import pkgFullTeamKit from '../assets/images/full-team-kit.jpg';
import catTshirts from '../assets/images/cat-tshirts.jpg';
import catTrackPants from '../assets/images/cat-trackpants.jpg';
import catShorts from '../assets/images/cat-shorts.jpg';
import catJackets from '../assets/images/cat-jackets.jpg';
import cwTshirtsGold from '../assets/images/cat-tshirts-gold.jpg';
import cwTshirtsRed from '../assets/images/cat-tshirts-red.jpg';
import cwTshirtsBlue from '../assets/images/cat-tshirts-blue.jpg';
import cwTshirtsGreen from '../assets/images/cat-tshirts-green.jpg';
import cwTshirtsWhite from '../assets/images/cat-tshirts-white.jpg';
import cwTrackpantsGold from '../assets/images/cat-trackpants-gold.jpg';
import cwTrackpantsRed from '../assets/images/cat-trackpants-red.jpg';
import cwTrackpantsBlue from '../assets/images/cat-trackpants-blue.jpg';
import cwTrackpantsGreen from '../assets/images/cat-trackpants-green.jpg';
import cwTrackpantsWhite from '../assets/images/cat-trackpants-white.jpg';
import cwShortsGold from '../assets/images/cat-shorts-gold.jpg';
import cwShortsRed from '../assets/images/cat-shorts-red.jpg';
import cwShortsBlue from '../assets/images/cat-shorts-blue.jpg';
import cwShortsGreen from '../assets/images/cat-shorts-green.jpg';
import cwShortsWhite from '../assets/images/cat-shorts-white.jpg';
import cwJacketsGold from '../assets/images/cat-jackets-gold.jpg';
import cwJacketsRed from '../assets/images/cat-jackets-red.jpg';
import cwJacketsBlue from '../assets/images/cat-jackets-blue.jpg';
import cwJacketsGreen from '../assets/images/cat-jackets-green.jpg';
import cwJacketsWhite from '../assets/images/cat-jackets-white.jpg';

export const CATEGORY_LIST = [
  {
    name: 'T-Shirts', slug: 'tshirts', gradient: 'linear-gradient(150deg,#241f13,#0f0d08)', icon: 'shirt', image: catTshirts,
    subcats: ['Printed T-Shirts', 'Collar / Polo T-Shirts', 'Plain T-Shirts', 'Jersey T-Shirts', 'Sports T-Shirts'],
    subcategories: [
      { name: 'Printed T-Shirts', slug: 'printed' },
      { name: 'Collar / Polo T-Shirts', slug: 'collar' },
      { name: 'Plain T-Shirts', slug: 'plain' },
      { name: 'Jersey T-Shirts', slug: 'jersey' },
      { name: 'Sports T-Shirts', slug: 'sports' },
    ],
  },
  {
    name: 'Track Pants', slug: 'trackpants', gradient: 'linear-gradient(150deg,#231d10,#100d07)', icon: 'pants', image: catTrackPants,
    subcats: ['Regular Track Pants', 'Slim Fit Track Pants', 'Training Track Pants', 'Running Track Pants', 'Jogger Track Pants'],
    subcategories: [
      { name: 'Regular Track Pants', slug: 'regular' },
      { name: 'Slim Fit Track Pants', slug: 'slimfit' },
      { name: 'Training Track Pants', slug: 'training' },
      { name: 'Running Track Pants', slug: 'running' },
      { name: 'Jogger Track Pants', slug: 'jogger' },
    ],
  },
  {
    name: 'Shorts', slug: 'shorts', gradient: 'linear-gradient(150deg,#241e12,#0f0d07)', icon: 'shorts', image: catShorts,
    subcats: ['Sports Shorts', 'Running Shorts', 'Training Shorts', 'Gym Shorts', 'Casual Shorts'],
    subcategories: [
      { name: 'Sports Shorts', slug: 'sports' },
      { name: 'Running Shorts', slug: 'running' },
      { name: 'Training Shorts', slug: 'training' },
      { name: 'Gym Shorts', slug: 'gym' },
      { name: 'Casual Shorts', slug: 'casual' },
    ],
  },
  {
    name: 'Jackets', slug: 'jackets', gradient: 'linear-gradient(150deg,#221c10,#0e0c07)', icon: 'jacket', image: catJackets,
    subcats: ['Sports Jackets', 'Training Jackets', 'Running Jackets', 'Windcheaters', 'Track Jackets'],
    subcategories: [
      { name: 'Sports Jackets', slug: 'sports' },
      { name: 'Training Jackets', slug: 'training' },
      { name: 'Running Jackets', slug: 'running' },
      { name: 'Windcheaters', slug: 'windcheaters' },
      { name: 'Track Jackets', slug: 'track' },
    ],
  },
];

// Kept for components that only need the light-weight shape.
export const CATEGORIES = CATEGORY_LIST.map(({ name, gradient, icon }) => ({ name, gradient, icon }));

export const PRODUCTS = [
  // T-Shirts
  { id: 1, imageUrl: cwTshirtsGold, name: 'Graphic Print Performance Tee — Black/Gold', price: 649, was: 849, tag: 'New', sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'T-Shirts', sub: 'Printed T-Shirts', desc: 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Black/Gold.' },
  { id: 2, imageUrl: cwTshirtsRed, name: 'Graphic Print Performance Tee — Crimson Red', price: 649, was: 849, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'T-Shirts', sub: 'Printed T-Shirts', desc: 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Crimson Red.' },
  { id: 3, imageUrl: cwTshirtsBlue, name: 'Graphic Print Performance Tee — Royal Blue', price: 649, was: 849, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.7, cat: 'T-Shirts', sub: 'Printed T-Shirts', desc: 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Royal Blue.' },
  { id: 4, imageUrl: cwTshirtsGreen, name: 'Graphic Print Performance Tee — Racing Green', price: 649, was: 849, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'T-Shirts', sub: 'Printed T-Shirts', desc: 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Racing Green.' },
  { id: 5, imageUrl: cwTshirtsWhite, name: 'Graphic Print Performance Tee — Platinum White', price: 649, was: 849, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'T-Shirts', sub: 'Printed T-Shirts', desc: 'Bold graphic print on breathable performance fabric — everyday streetwear with athletic DNA. Shown in Platinum White.' },
  { id: 6, imageUrl: cwTshirtsGold, name: 'Ribbed Collar Polo Tee — Black/Gold', price: 699, was: 899, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.6, cat: 'T-Shirts', sub: 'Collar / Polo T-Shirts', desc: 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Black/Gold.' },
  { id: 7, imageUrl: cwTshirtsRed, name: 'Ribbed Collar Polo Tee — Crimson Red', price: 699, was: 899, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'T-Shirts', sub: 'Collar / Polo T-Shirts', desc: 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Crimson Red.' },
  { id: 8, imageUrl: cwTshirtsBlue, name: 'Ribbed Collar Polo Tee — Royal Blue', price: 699, was: 899, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.7, cat: 'T-Shirts', sub: 'Collar / Polo T-Shirts', desc: 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Royal Blue.' },
  { id: 9, imageUrl: cwTshirtsGreen, name: 'Ribbed Collar Polo Tee — Racing Green', price: 699, was: 899, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.4, cat: 'T-Shirts', sub: 'Collar / Polo T-Shirts', desc: 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Racing Green.' },
  { id: 10, imageUrl: cwTshirtsWhite, name: 'Ribbed Collar Polo Tee — Platinum White', price: 699, was: 899, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'T-Shirts', sub: 'Collar / Polo T-Shirts', desc: 'Soft-touch polo with a ribbed collar — everyday comfort with a clean, club-ready look. Shown in Platinum White.' },
  { id: 11, imageUrl: cwTshirtsGold, name: 'Essential Plain Cotton Tee — Black/Gold', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.4, cat: 'T-Shirts', sub: 'Plain T-Shirts', desc: 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Black/Gold.' },
  { id: 12, imageUrl: cwTshirtsRed, name: 'Essential Plain Cotton Tee — Crimson Red', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.3, cat: 'T-Shirts', sub: 'Plain T-Shirts', desc: 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Crimson Red.' },
  { id: 13, imageUrl: cwTshirtsBlue, name: 'Essential Plain Cotton Tee — Royal Blue', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'T-Shirts', sub: 'Plain T-Shirts', desc: 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Royal Blue.' },
  { id: 14, imageUrl: cwTshirtsGreen, name: 'Essential Plain Cotton Tee — Racing Green', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.2, cat: 'T-Shirts', sub: 'Plain T-Shirts', desc: 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Racing Green.' },
  { id: 15, imageUrl: cwTshirtsWhite, name: 'Essential Plain Cotton Tee — Platinum White', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.3, cat: 'T-Shirts', sub: 'Plain T-Shirts', desc: 'A clean, no-logo essential in heavyweight cotton — the one tee that goes with everything. Shown in Platinum White.' },
  { id: 16, imageUrl: cwTshirtsGold, name: 'Sublimation Home Jersey — Black/Gold', price: 849, was: 1099, tag: 'Best Seller', sizes: ['S', 'M', 'L', 'XL'], rating: 4.8, cat: 'T-Shirts', sub: 'Jersey T-Shirts', desc: 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Black/Gold.' },
  { id: 17, imageUrl: cwTshirtsRed, name: 'Sublimation Home Jersey — Crimson Red', price: 849, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.7, cat: 'T-Shirts', sub: 'Jersey T-Shirts', desc: 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Crimson Red.' },
  { id: 18, imageUrl: cwTshirtsBlue, name: 'Sublimation Home Jersey — Royal Blue', price: 849, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.9, cat: 'T-Shirts', sub: 'Jersey T-Shirts', desc: 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Royal Blue.' },
  { id: 19, imageUrl: cwTshirtsGreen, name: 'Sublimation Home Jersey — Racing Green', price: 849, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'T-Shirts', sub: 'Jersey T-Shirts', desc: 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Racing Green.' },
  { id: 20, imageUrl: cwTshirtsWhite, name: 'Sublimation Home Jersey — Platinum White', price: 849, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.7, cat: 'T-Shirts', sub: 'Jersey T-Shirts', desc: 'Full sublimation match jersey in breathable, moisture-wicking fabric — built for 90 minutes of play. Shown in Platinum White.' },
  { id: 21, imageUrl: cwTshirtsGold, name: 'Basketball Sports Tee — Black/Gold', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'T-Shirts', sub: 'Sports T-Shirts', desc: 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Black/Gold.' },
  { id: 22, imageUrl: cwTshirtsRed, name: 'Basketball Sports Tee — Crimson Red', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'T-Shirts', sub: 'Sports T-Shirts', desc: 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Crimson Red.' },
  { id: 23, imageUrl: cwTshirtsBlue, name: 'Basketball Sports Tee — Royal Blue', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.7, cat: 'T-Shirts', sub: 'Sports T-Shirts', desc: 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Royal Blue.' },
  { id: 24, imageUrl: cwTshirtsGreen, name: 'Basketball Sports Tee — Racing Green', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'T-Shirts', sub: 'Sports T-Shirts', desc: 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Racing Green.' },
  { id: 25, imageUrl: cwTshirtsWhite, name: 'Basketball Sports Tee — Platinum White', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'T-Shirts', sub: 'Sports T-Shirts', desc: 'Mesh-back sports tee built for airflow under the lights, on any court. Shown in Platinum White.' },
  // Track Pants
  { id: 26, imageUrl: cwTrackpantsGold, name: 'Regular Fit Track Pant — Black/Gold', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Regular Track Pants', desc: 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Black/Gold.' },
  { id: 27, imageUrl: cwTrackpantsRed, name: 'Regular Fit Track Pant — Crimson Red', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Track Pants', sub: 'Regular Track Pants', desc: 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Crimson Red.' },
  { id: 28, imageUrl: cwTrackpantsBlue, name: 'Regular Fit Track Pant — Royal Blue', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Regular Track Pants', desc: 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Royal Blue.' },
  { id: 29, imageUrl: cwTrackpantsGreen, name: 'Regular Fit Track Pant — Racing Green', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.2, cat: 'Track Pants', sub: 'Regular Track Pants', desc: 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Racing Green.' },
  { id: 30, imageUrl: cwTrackpantsWhite, name: 'Regular Fit Track Pant — Platinum White', price: 799, was: 999, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Track Pants', sub: 'Regular Track Pants', desc: 'A relaxed, everyday track pant in soft poly-fleece — comfortable on and off the field. Shown in Platinum White.' },
  { id: 31, imageUrl: cwTrackpantsGold, name: 'Slim Fit Track Pant — Black/Gold', price: 899, was: 1099, tag: 'New', sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Slim Fit Track Pants', desc: 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Black/Gold.' },
  { id: 32, imageUrl: cwTrackpantsRed, name: 'Slim Fit Track Pant — Crimson Red', price: 899, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Slim Fit Track Pants', desc: 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Crimson Red.' },
  { id: 33, imageUrl: cwTrackpantsBlue, name: 'Slim Fit Track Pant — Royal Blue', price: 899, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'Track Pants', sub: 'Slim Fit Track Pants', desc: 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Royal Blue.' },
  { id: 34, imageUrl: cwTrackpantsGreen, name: 'Slim Fit Track Pant — Racing Green', price: 899, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Track Pants', sub: 'Slim Fit Track Pants', desc: 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Racing Green.' },
  { id: 35, imageUrl: cwTrackpantsWhite, name: 'Slim Fit Track Pant — Platinum White', price: 899, was: 1099, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Slim Fit Track Pants', desc: 'A tapered, tailored cut for a sharper silhouette without losing stretch. Shown in Platinum White.' },
  { id: 36, imageUrl: cwTrackpantsGold, name: 'Training Track Pant — Black/Gold', price: 999, was: 1249, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.6, cat: 'Track Pants', sub: 'Training Track Pants', desc: 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Black/Gold.' },
  { id: 37, imageUrl: cwTrackpantsRed, name: 'Training Track Pant — Crimson Red', price: 999, was: 1249, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Training Track Pants', desc: 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Crimson Red.' },
  { id: 38, imageUrl: cwTrackpantsBlue, name: 'Training Track Pant — Royal Blue', price: 999, was: 1249, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.7, cat: 'Track Pants', sub: 'Training Track Pants', desc: 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Royal Blue.' },
  { id: 39, imageUrl: cwTrackpantsGreen, name: 'Training Track Pant — Racing Green', price: 999, was: 1249, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Training Track Pants', desc: 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Racing Green.' },
  { id: 40, imageUrl: cwTrackpantsWhite, name: 'Training Track Pant — Platinum White', price: 999, was: 1249, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Training Track Pants', desc: 'Built for the gym floor — reinforced knees and a snug, secure waistband. Shown in Platinum White.' },
  { id: 41, imageUrl: cwTrackpantsGold, name: 'Four-Way Lycra Running Track Pant — Black/Gold', price: 1099, was: 1399, tag: 'Best Seller', sizes: ['M', 'L', 'XL'], rating: 4.7, cat: 'Track Pants', sub: 'Running Track Pants', desc: 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Black/Gold.' },
  { id: 42, imageUrl: cwTrackpantsRed, name: 'Four-Way Lycra Running Track Pant — Crimson Red', price: 1099, was: 1399, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.6, cat: 'Track Pants', sub: 'Running Track Pants', desc: 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Crimson Red.' },
  { id: 43, imageUrl: cwTrackpantsBlue, name: 'Four-Way Lycra Running Track Pant — Royal Blue', price: 1099, was: 1399, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.8, cat: 'Track Pants', sub: 'Running Track Pants', desc: 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Royal Blue.' },
  { id: 44, imageUrl: cwTrackpantsGreen, name: 'Four-Way Lycra Running Track Pant — Racing Green', price: 1099, was: 1399, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Running Track Pants', desc: 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Racing Green.' },
  { id: 45, imageUrl: cwTrackpantsWhite, name: 'Four-Way Lycra Running Track Pant — Platinum White', price: 1099, was: 1399, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.6, cat: 'Track Pants', sub: 'Running Track Pants', desc: 'Four-way stretch lycra track pant that moves with every sprint and stride. Shown in Platinum White.' },
  { id: 46, imageUrl: cwTrackpantsGold, name: 'Jogger Track Pant — Black/Gold', price: 849, was: 1049, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Track Pants', sub: 'Jogger Track Pants', desc: 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Black/Gold.' },
  { id: 47, imageUrl: cwTrackpantsRed, name: 'Jogger Track Pant — Crimson Red', price: 849, was: 1049, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Jogger Track Pants', desc: 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Crimson Red.' },
  { id: 48, imageUrl: cwTrackpantsBlue, name: 'Jogger Track Pant — Royal Blue', price: 849, was: 1049, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'Track Pants', sub: 'Jogger Track Pants', desc: 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Royal Blue.' },
  { id: 49, imageUrl: cwTrackpantsGreen, name: 'Jogger Track Pant — Racing Green', price: 849, was: 1049, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Track Pants', sub: 'Jogger Track Pants', desc: 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Racing Green.' },
  { id: 50, imageUrl: cwTrackpantsWhite, name: 'Jogger Track Pant — Platinum White', price: 849, was: 1049, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Track Pants', sub: 'Jogger Track Pants', desc: 'Cuffed-hem jogger fit with side pockets — training kit that doubles as off-duty wear. Shown in Platinum White.' },
  // Shorts
  { id: 51, imageUrl: cwShortsGold, name: 'All-Purpose Sports Shorts — Black/Gold', price: 549, was: 699, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Shorts', sub: 'Sports Shorts', desc: 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Black/Gold.' },
  { id: 52, imageUrl: cwShortsRed, name: 'All-Purpose Sports Shorts — Crimson Red', price: 549, was: 699, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Sports Shorts', desc: 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Crimson Red.' },
  { id: 53, imageUrl: cwShortsBlue, name: 'All-Purpose Sports Shorts — Royal Blue', price: 549, was: 699, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Shorts', sub: 'Sports Shorts', desc: 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Royal Blue.' },
  { id: 54, imageUrl: cwShortsGreen, name: 'All-Purpose Sports Shorts — Racing Green', price: 549, was: 699, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.2, cat: 'Shorts', sub: 'Sports Shorts', desc: 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Racing Green.' },
  { id: 55, imageUrl: cwShortsWhite, name: 'All-Purpose Sports Shorts — Platinum White', price: 549, was: 699, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Sports Shorts', desc: 'Quick-dry shorts with an inner brief — built for match-day intensity across any sport. Shown in Platinum White.' },
  { id: 56, imageUrl: cwShortsGold, name: 'Lightweight Running Shorts — Black/Gold', price: 499, was: 649, tag: 'New', sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Shorts', sub: 'Running Shorts', desc: 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Black/Gold.' },
  { id: 57, imageUrl: cwShortsRed, name: 'Lightweight Running Shorts — Crimson Red', price: 499, was: 649, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Shorts', sub: 'Running Shorts', desc: 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Crimson Red.' },
  { id: 58, imageUrl: cwShortsBlue, name: 'Lightweight Running Shorts — Royal Blue', price: 499, was: 649, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'Shorts', sub: 'Running Shorts', desc: 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Royal Blue.' },
  { id: 59, imageUrl: cwShortsGreen, name: 'Lightweight Running Shorts — Racing Green', price: 499, was: 649, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Running Shorts', desc: 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Racing Green.' },
  { id: 60, imageUrl: cwShortsWhite, name: 'Lightweight Running Shorts — Platinum White', price: 499, was: 649, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Shorts', sub: 'Running Shorts', desc: 'Split-hem, featherweight shorts designed to move with your stride, mile after mile. Shown in Platinum White.' },
  { id: 61, imageUrl: cwShortsGold, name: 'Training Shorts — Black/Gold', price: 579, was: 729, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Shorts', sub: 'Training Shorts', desc: 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Black/Gold.' },
  { id: 62, imageUrl: cwShortsRed, name: 'Training Shorts — Crimson Red', price: 579, was: 729, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Training Shorts', desc: 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Crimson Red.' },
  { id: 63, imageUrl: cwShortsBlue, name: 'Training Shorts — Royal Blue', price: 579, was: 729, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Shorts', sub: 'Training Shorts', desc: 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Royal Blue.' },
  { id: 64, imageUrl: cwShortsGreen, name: 'Training Shorts — Racing Green', price: 579, was: 729, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.2, cat: 'Shorts', sub: 'Training Shorts', desc: 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Racing Green.' },
  { id: 65, imageUrl: cwShortsWhite, name: 'Training Shorts — Platinum White', price: 579, was: 729, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Training Shorts', desc: 'Durable training shorts with a zip pocket — built for the gym and beyond. Shown in Platinum White.' },
  { id: 66, imageUrl: cwShortsGold, name: 'Gym Shorts — Black/Gold', price: 529, was: 679, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.3, cat: 'Shorts', sub: 'Gym Shorts', desc: 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Black/Gold.' },
  { id: 67, imageUrl: cwShortsRed, name: 'Gym Shorts — Crimson Red', price: 529, was: 679, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.2, cat: 'Shorts', sub: 'Gym Shorts', desc: 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Crimson Red.' },
  { id: 68, imageUrl: cwShortsBlue, name: 'Gym Shorts — Royal Blue', price: 529, was: 679, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.4, cat: 'Shorts', sub: 'Gym Shorts', desc: 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Royal Blue.' },
  { id: 69, imageUrl: cwShortsGreen, name: 'Gym Shorts — Racing Green', price: 529, was: 679, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.1, cat: 'Shorts', sub: 'Gym Shorts', desc: 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Racing Green.' },
  { id: 70, imageUrl: cwShortsWhite, name: 'Gym Shorts — Platinum White', price: 529, was: 679, tag: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], rating: 4.2, cat: 'Shorts', sub: 'Gym Shorts', desc: 'Loose-fit, breathable shorts made for heavy lifting days. Shown in Platinum White.' },
  { id: 71, imageUrl: cwShortsGold, name: 'Casual Sport Shorts — Black/Gold', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.3, cat: 'Shorts', sub: 'Casual Shorts', desc: 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Black/Gold.' },
  { id: 72, imageUrl: cwShortsRed, name: 'Casual Sport Shorts — Crimson Red', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.2, cat: 'Shorts', sub: 'Casual Shorts', desc: 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Crimson Red.' },
  { id: 73, imageUrl: cwShortsBlue, name: 'Casual Sport Shorts — Royal Blue', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Shorts', sub: 'Casual Shorts', desc: 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Royal Blue.' },
  { id: 74, imageUrl: cwShortsGreen, name: 'Casual Sport Shorts — Racing Green', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.1, cat: 'Shorts', sub: 'Casual Shorts', desc: 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Racing Green.' },
  { id: 75, imageUrl: cwShortsWhite, name: 'Casual Sport Shorts — Platinum White', price: 449, was: 599, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.2, cat: 'Shorts', sub: 'Casual Shorts', desc: 'Everyday shorts with an athletic look — comfortable enough to wear all day. Shown in Platinum White.' },
  // Jackets
  { id: 76, imageUrl: cwJacketsGold, name: 'Sports Jacket — Black/Gold', price: 1699, was: 2199, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.6, cat: 'Jackets', sub: 'Sports Jackets', desc: 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Black/Gold.' },
  { id: 77, imageUrl: cwJacketsRed, name: 'Sports Jacket — Crimson Red', price: 1699, was: 2199, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'Jackets', sub: 'Sports Jackets', desc: 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Crimson Red.' },
  { id: 78, imageUrl: cwJacketsBlue, name: 'Sports Jacket — Royal Blue', price: 1699, was: 2199, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.7, cat: 'Jackets', sub: 'Sports Jackets', desc: 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Royal Blue.' },
  { id: 79, imageUrl: cwJacketsGreen, name: 'Sports Jacket — Racing Green', price: 1699, was: 2199, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.4, cat: 'Jackets', sub: 'Sports Jackets', desc: 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Racing Green.' },
  { id: 80, imageUrl: cwJacketsWhite, name: 'Sports Jacket — Platinum White', price: 1699, was: 2199, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'Jackets', sub: 'Sports Jackets', desc: 'A versatile full-zip sports jacket for warm-ups, travel days, and cool evenings. Shown in Platinum White.' },
  { id: 81, imageUrl: cwJacketsGold, name: 'Training Jacket — Black/Gold', price: 1799, was: 2299, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.5, cat: 'Jackets', sub: 'Training Jackets', desc: 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Black/Gold.' },
  { id: 82, imageUrl: cwJacketsRed, name: 'Training Jacket — Crimson Red', price: 1799, was: 2299, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.4, cat: 'Jackets', sub: 'Training Jackets', desc: 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Crimson Red.' },
  { id: 83, imageUrl: cwJacketsBlue, name: 'Training Jacket — Royal Blue', price: 1799, was: 2299, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.6, cat: 'Jackets', sub: 'Training Jackets', desc: 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Royal Blue.' },
  { id: 84, imageUrl: cwJacketsGreen, name: 'Training Jacket — Racing Green', price: 1799, was: 2299, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.3, cat: 'Jackets', sub: 'Training Jackets', desc: 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Racing Green.' },
  { id: 85, imageUrl: cwJacketsWhite, name: 'Training Jacket — Platinum White', price: 1799, was: 2299, tag: null, sizes: ['M', 'L', 'XL'], rating: 4.4, cat: 'Jackets', sub: 'Training Jackets', desc: 'Lightweight training jacket with mesh venting for high-output sessions. Shown in Platinum White.' },
  { id: 86, imageUrl: cwJacketsGold, name: 'Running Jacket — Black/Gold', price: 1899, was: 2399, tag: 'New', sizes: ['S', 'M', 'L', 'XL'], rating: 4.6, cat: 'Jackets', sub: 'Running Jackets', desc: 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Black/Gold.' },
  { id: 87, imageUrl: cwJacketsRed, name: 'Running Jacket — Crimson Red', price: 1899, was: 2399, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Jackets', sub: 'Running Jackets', desc: 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Crimson Red.' },
  { id: 88, imageUrl: cwJacketsBlue, name: 'Running Jacket — Royal Blue', price: 1899, was: 2399, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.7, cat: 'Jackets', sub: 'Running Jackets', desc: 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Royal Blue.' },
  { id: 89, imageUrl: cwJacketsGreen, name: 'Running Jacket — Racing Green', price: 1899, was: 2399, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.4, cat: 'Jackets', sub: 'Running Jackets', desc: 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Racing Green.' },
  { id: 90, imageUrl: cwJacketsWhite, name: 'Running Jacket — Platinum White', price: 1899, was: 2399, tag: null, sizes: ['S', 'M', 'L', 'XL'], rating: 4.5, cat: 'Jackets', sub: 'Running Jackets', desc: 'Wind-resistant running jacket with reflective trims for low-light miles. Shown in Platinum White.' },
  { id: 91, imageUrl: cwJacketsGold, name: 'Windcheater — Black/Gold', price: 1499, was: 1899, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.4, cat: 'Jackets', sub: 'Windcheaters', desc: 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Black/Gold.' },
  { id: 92, imageUrl: cwJacketsRed, name: 'Windcheater — Crimson Red', price: 1499, was: 1899, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.3, cat: 'Jackets', sub: 'Windcheaters', desc: 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Crimson Red.' },
  { id: 93, imageUrl: cwJacketsBlue, name: 'Windcheater — Royal Blue', price: 1499, was: 1899, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.5, cat: 'Jackets', sub: 'Windcheaters', desc: 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Royal Blue.' },
  { id: 94, imageUrl: cwJacketsGreen, name: 'Windcheater — Racing Green', price: 1499, was: 1899, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.2, cat: 'Jackets', sub: 'Windcheaters', desc: 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Racing Green.' },
  { id: 95, imageUrl: cwJacketsWhite, name: 'Windcheater — Platinum White', price: 1499, was: 1899, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.3, cat: 'Jackets', sub: 'Windcheaters', desc: 'A packable, wind-blocking shell layer for unpredictable weather on the sideline. Shown in Platinum White.' },
  { id: 96, imageUrl: cwJacketsGold, name: 'Hooded Sports Track Jacket — Black/Gold', price: 1899, was: 2399, tag: 'Best Seller', sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.9, cat: 'Jackets', sub: 'Track Jackets', desc: 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Black/Gold.' },
  { id: 97, imageUrl: cwJacketsRed, name: 'Hooded Sports Track Jacket — Crimson Red', price: 1899, was: 2399, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.8, cat: 'Jackets', sub: 'Track Jackets', desc: 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Crimson Red.' },
  { id: 98, imageUrl: cwJacketsBlue, name: 'Hooded Sports Track Jacket — Royal Blue', price: 1899, was: 2399, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 5.0, cat: 'Jackets', sub: 'Track Jackets', desc: 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Royal Blue.' },
  { id: 99, imageUrl: cwJacketsGreen, name: 'Hooded Sports Track Jacket — Racing Green', price: 1899, was: 2399, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.7, cat: 'Jackets', sub: 'Track Jackets', desc: 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Racing Green.' },
  { id: 100, imageUrl: cwJacketsWhite, name: 'Hooded Sports Track Jacket — Platinum White', price: 1899, was: 2399, tag: null, sizes: ['M', 'L', 'XL', 'XXL'], rating: 4.8, cat: 'Jackets', sub: 'Track Jackets', desc: 'Windproof hooded track jacket with a fleece lining — matchday-to-street versatility. Shown in Platinum White.' },
];

export const TESTIMONIALS = [
  { name: 'Arjun Mehta', team: 'Chennai Strikers FC', quote: 'Fabric held up across a full season of matches — colours never faded even after weekly washes.' },
  { name: 'Priya Raman', team: 'Titan Basketball Club', quote: 'Ordered 18 jerseys for the squad, sizing was spot on and delivery reached us well before our tournament.' },
  { name: 'Suresh Kumar', team: 'Bengaluru Ballers', quote: 'Custom sublimation came out sharper than we expected — the design team nailed our team colours.' },
  { name: 'Divya Nair', team: 'Kochi Warriors', quote: 'Support team was responsive on WhatsApp through the whole ordering process, made bulk ordering easy.' },
];

export const PACKAGES = [
  { name: 'Single Side Sublimation Jersey', incl: 'Jersey Only', price: 260, badge: null, img: pkgSingleSide },
  { name: 'Double Side Sublimation Jersey', incl: 'Jersey Only', price: 300, badge: null, img: pkgDoubleSide },
  { name: 'Double Side Jersey + Sublimation Shorts', incl: 'Full Set', price: 520, badge: 'Popular', img: pkgJerseyShorts },
  { name: 'Premium Double Side Set', incl: 'Double Jersey + Double Sublimation Shorts', price: 540, badge: null, img: pkgDoubleSide },
  { name: 'Single Side Set', incl: 'Jersey + Normal Shorts', price: 380, badge: null, img: pkgJerseyShorts },
  { name: 'Double Side Jersey + NS Fabric Shorts', incl: 'Jersey + NS Fabric Shorts', price: 450, badge: null, img: pkgDoubleSide },
  { name: 'Single Side Polo + NS Fabric Shorts', incl: 'Polo + NS Fabric Shorts', price: 410, badge: null, img: pkgPoloShorts },
  { name: 'Tracksuit', incl: 'Upper + Lower', price: 750, badge: null, img: pkgTracksuit },
  { name: 'Full Team Kit', incl: 'Jersey, Shorts, Tracksuit, Bag, Bottle', price: 1450, badge: 'Best Value', img: pkgFullTeamKit },
];

export const WHY_ITEMS = [
  { num: '01', title: 'Premium Quality', text: 'Moisture-wicking, breathable fabric tested for match-day performance.', icon: 'star' },
  { num: '02', title: 'Custom Printing', text: 'Full sublimation printing — names, numbers, and team crests, done right.', icon: 'shirt' },
  { num: '03', title: 'Bulk Team Orders', text: 'Minimum 10 kits, no maximum — built for squads of any size.', icon: 'team' },
  { num: '04', title: 'Fast Delivery Across India', text: 'Pan-India shipping with tracked, reliable delivery windows.', icon: 'bolt' },
  { num: '05', title: 'Secure Payments', text: 'UPI, cards, net banking and COD — all handled securely at checkout.', icon: 'shield' },
  { num: '06', title: 'Easy Support', text: 'Real people on WhatsApp and call — for orders large or small.', icon: 'chat' },
];

export const ARRIVALS = [
  { tag: 'Football Collection', title: 'Sublimation Jersey — 2026 Kit', gradient: 'linear-gradient(135deg,#221c0f,#0f0d08)', imageUrl: catTshirts },
  { tag: 'Training', title: 'Four-Way Lycra Track Pant', gradient: 'linear-gradient(135deg,#241e10,#100e07)', imageUrl: catTrackPants },
  { tag: 'Outerwear', title: 'Hooded Sports Jacket', gradient: 'linear-gradient(135deg,#1e1a10,#0d0b07)', imageUrl: catJackets },
];

export const COUNTERS = [
  { target: 12000, label: 'Jerseys Delivered' },
  { target: 450, label: 'Teams Served' },
  { target: 28, label: 'States Reached' },
  { target: 98, label: '% On-Time Delivery' },
];

export const SIZE_OPTS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const OFFERS = [
  { id: 1, code: 'VANDA10', desc: '10% off on your first order', active: true },
  { id: 2, code: 'TEAM40', desc: 'Up to 40% off on bulk team kits', active: true },
  { id: 3, code: 'FREESHIP', desc: 'Free delivery on orders above ₹2000', active: false },
];

export const INITIAL_ORDERS = [
  { id: 'VSW-1042', customer: 'Arjun Mehta', items: 3, total: 2547, status: 'Delivered', date: '2026-07-18' },
  { id: 'VSW-1043', customer: 'Priya Raman', items: 1, total: 849, status: 'Shipped', date: '2026-07-22' },
  { id: 'VSW-1044', customer: 'Suresh Kumar', items: 2, total: 1698, status: 'Processing', date: '2026-07-27' },
];

export const INITIAL_JERSEY_ORDERS = [
  { id: 'VSW-J-021', team: 'Chennai Strikers FC', players: 16, package: 'Full Team Kit', total: 23200, status: 'In Production', date: '2026-07-15' },
  { id: 'VSW-J-022', team: 'Titan Basketball Club', players: 12, package: 'Double Side Sublimation Jersey', total: 3600, status: 'Design Review', date: '2026-07-24' },
];

export const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun@example.com', orders: 3, joined: '2026-02-11' },
  { id: 2, name: 'Priya Raman', email: 'priya@example.com', orders: 1, joined: '2026-04-02' },
  { id: 3, name: 'Suresh Kumar', email: 'suresh@example.com', orders: 2, joined: '2026-05-19' },
];

export const INITIAL_REVIEWS = [
  { id: 1, customer: 'Arjun Mehta', product: 'Sublimation Jersey — Home Kit', rating: 5, text: 'Fabric held up across a full season.', approved: true },
  { id: 2, customer: 'Divya Nair', product: 'Hooded Sports Jacket', rating: 4, text: 'Warm and well stitched, runs slightly large.', approved: false },
];

export const INITIAL_MESSAGES = [
  { id: 1, name: 'Rahul S.', email: 'rahul@example.com', subject: 'Bulk order for college fest', read: false },
  { id: 2, name: 'Meera K.', email: 'meera@example.com', subject: 'Sizing chart request', read: true },
];
