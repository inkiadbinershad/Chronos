const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    name: 'Field Commander',
    shortDesc: 'Military Heritage · Steel Case · Brown Leather',
    description: 'The Field Commander embodies military heritage reborn in a modern masterpiece. Forged from Grade 5 titanium and finished with a matte-brushed bezel, it carries the soul of wartime precision into a world that demands style. The luminous hands and hour markers ensure legibility in complete darkness — a nod to its battlefield origins. Every micro-detail on the dial is a tribute to the commanders who trusted their timepiece with their life.',
    price: 4200,
    image: '/images/field-commander.jpg',
    category: 'military',
    movement: 'Automatic, Swiss ETA 2824-2',
    caseMaterial: 'Grade 5 Titanium',
    waterResistance: '200m / 660ft',
    diameter: '42mm',
    strap: 'Italian Brown Leather, 20mm',
    inStock: true,
    stockCount: 24,
    featured: true,
    rating: 4.9,
    reviewCount: 186,
  },
  {
    name: 'Filwd Chronograph',
    shortDesc: 'Contemporary Edge · Rose Gold · Sapphire Crystal',
    description: 'The Filwd Chronograph defines contemporary luxury with razor-sharp lines and a chronograph movement that is as precise as it is beautiful. The layered dial catches light at every angle, creating an ever-changing play of shadow and brilliance. Set in a polished 316L stainless steel case with rose gold PVD accents, the Filwd is an instrument of modern sophistication — perfect for those who lead from the front and demand their watch does too.',
    price: 6800,
    image: '/images/filwd.jpg',
    category: 'contemporary',
    movement: 'Swiss Valjoux 7750 Chronograph',
    caseMaterial: '316L Stainless Steel, Rose Gold PVD',
    waterResistance: '100m / 330ft',
    diameter: '44mm',
    strap: 'Alligator-embossed Black Rubber, 22mm',
    inStock: true,
    stockCount: 12,
    featured: true,
    rating: 4.8,
    reviewCount: 94,
  },
  {
    name: 'Tourbillon Noir',
    shortDesc: 'Ultra Luxury · Skeletonized · Flying Tourbillon',
    description: 'The Tourbillon Noir is CHRONOS at its absolute apex. A flying tourbillon complication — rotating once per minute, visible through the exhibition case back — sits at 6 o\'clock, defying gravity and conventional watchmaking. The fully skeletonized black PVD dial reveals the intricate movement architecture within: bridges, gears, and springs assembled by a single master watchmaker. Limited to 50 pieces annually. Comes with a Certificate of Authenticity, mahogany presentation box, and lifetime service warranty.',
    price: 12500,
    image: '/images/tourbillon-noir.jpg',
    category: 'ultra-luxury',
    movement: 'In-house CHRON-01 Flying Tourbillon, Hand-wound',
    caseMaterial: 'Black PVD Steel, Sapphire Exhibition Caseback',
    waterResistance: '50m / 165ft',
    diameter: '41mm',
    strap: 'Hornback Crocodile, 19mm, Black with Gold Stitching',
    inStock: true,
    stockCount: 7,
    featured: true,
    rating: 5.0,
    reviewCount: 43,
  },
];

const adminUser = {
  name: 'CHRONOS Admin',
  email: 'admin@chronos.com',
  password: 'admin123',
  role: 'admin',
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chronos');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    const savedProducts = await Product.insertMany(products);
    console.log(`Seeded ${savedProducts.length} products`);

    const admin = new User(adminUser);
    await admin.save();
    console.log('Admin user created: admin@chronos.com / admin123');

    console.log('Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
