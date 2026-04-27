const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
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
  {
    name: 'Midnight Sovereign',
    shortDesc: 'Dress Excellence · Platinum · Midnight Dial',
    description: 'The Midnight Sovereign commands the room without uttering a word. A platinum case houses a deep midnight-blue sunburst dial that shifts from abyssal black to royal blue with every tilt of the wrist. The applied indices are hand-polished white gold, catching candlelight at a dinner table or moonlight on a midnight drive. Beneath the surface beats a Swiss automatic movement with a 72-hour power reserve — because true sovereignty means never stopping. For the man who writes his own rules and wears his authority on his wrist.',
    price: 8900,
    image: '/images/watch-4.jpg',
    category: 'dress',
    movement: 'Automatic, Swiss ETA 2892-A2',
    caseMaterial: '950 Platinum',
    waterResistance: '30m / 100ft',
    diameter: '40mm',
    strap: 'Black Alligator Leather, 20mm',
    inStock: true,
    stockCount: 15,
    featured: true,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    name: 'Abyssal Diver',
    shortDesc: 'Deep Sea · Ceramic Bezel · Luminescent',
    description: 'Forged for the depths where light surrenders to darkness, the Abyssal Diver is a instrument of underwater dominance. The unidirectional ceramic bezel clicks with surgical precision, marking decompression stops with absolute certainty. Super-LumiNova fills every marker, blazing green against the matte black dial at 300 meters below the surface. The helium escape valve ensures survival during saturation diving, while the brushed titanium case shrugs off the crushing pressure of the abyss. For those who descend into darkness and return with stories no one else can tell.',
    price: 5200,
    image: '/images/watch-5.jpg',
    category: 'diver',
    movement: 'Automatic, Swiss Sellita SW200-1',
    caseMaterial: 'Grade 2 Titanium',
    waterResistance: '300m / 1000ft',
    diameter: '43mm',
    strap: 'Titanium Bracelet with Diving Extension',
    inStock: true,
    stockCount: 31,
    featured: true,
    rating: 4.7,
    reviewCount: 203,
  },
  {
    name: 'Obsidian Phantom',
    shortDesc: 'Stealth Luxury · Full Black · Carbon Fiber',
    description: 'The Obsidian Phantom exists in the space between shadow and silence. Every surface is consumed by Vantablack-grade PVD coating — case, bracelet, crown, and clasp — absorbing 99.9% of visible light. The carbon fiber dial is woven from aerospace-grade filament, each thread a testament to engineering obsession. Only the blood-red seconds hand betrays the darkness, sweeping across the void like a warning. Powered by a chronometer-certified movement visible through a smoked sapphire caseback. For operatives, executives, and ghosts who move through the world unseen.',
    price: 11400,
    image: '/images/watch-6.jpg',
    category: 'stealth',
    movement: 'Automatic, Chronometer-Certified COSC',
    caseMaterial: 'Black DLC Steel, Carbon Fiber Dial',
    waterResistance: '100m / 330ft',
    diameter: '42mm',
    strap: 'Black DLC Steel Bracelet',
    inStock: true,
    stockCount: 9,
    featured: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    name: 'Crimson Vanguard',
    shortDesc: 'Sport Elite · Red Accents · Chronograph',
    description: 'The Crimson Vanguard bleeds adrenaline. A high-contrast black dial explodes with crimson subdials and a tachymeter scale that dares you to push faster. The column-wheel chronograph engages with a mechanical snap that sends a shiver up your spine — start, stop, reset — each click a declaration of intent. The forged carbon case is lighter than aluminum yet stronger than steel, designed for the apex predator who hunts apexes. Whether timing a lap at Monza or a deal on Wall Street, the Vanguard never blinks first.',
    price: 7600,
    image: '/images/watch-7.jpg',
    category: 'sport',
    movement: 'Automatic Chronograph, Swiss ETA 7753',
    caseMaterial: 'Forged Carbon Composite',
    waterResistance: '100m / 330ft',
    diameter: '45mm',
    strap: 'Perforated Black Leather Racing Strap, 22mm',
    inStock: true,
    stockCount: 18,
    featured: true,
    rating: 4.8,
    reviewCount: 154,
  },
  {
    name: 'Eclipse Regent',
    shortDesc: 'Grand Complication · Moonphase · Rose Gold',
    description: 'The Eclipse Regent is CHRONOS declaring war on ordinary time. A grand complication movement drives not just hours and minutes, but the eternal dance of sun and moon — a photorealistic moonphase disc that mirrors the lunar surface with micrometer precision. The 18k rose gold case is hand-finished with black polish on the lugs, reflecting light like liquid metal. A perpetual calendar knows every leap year until 2100 without adjustment. The guilloché dial is engine-turned by a 70-year-old artisan in the Vallée de Joux, each pattern unique as a fingerprint. For the collector who already has everything — except this.',
    price: 14200,
    image: '/images/watch-8.jpg',
    category: 'grand-complication',
    movement: 'In-house CHRON-GC Perpetual Calendar, Automatic',
    caseMaterial: '18k Rose Gold',
    waterResistance: '30m / 100ft',
    diameter: '42mm',
    strap: 'Hand-stitched Brown Alligator, 20mm, Rose Gold Deployant',
    inStock: true,
    stockCount: 5,
    featured: true,
    rating: 5.0,
    reviewCount: 38,
  },
];

const adminUser = {
  name: 'CHRONOS Admin',
  email: 'admin@chronos.com',
  password: 'admin123',
  role: 'admin',
};

async function seed() {
  let mongoUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('MongoDB not available, starting in-memory server...');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
    console.log('In-memory MongoDB connected');
  }

  try {
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
