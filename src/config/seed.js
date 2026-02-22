require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('../models/Product');

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    description: 'Apple iPhone 17 Pro with A19 Pro chip, titanium design, and ProCamera system.',
    variants: [
      {
        label: '256GB - Natural Titanium',
        color: 'Silver',
        storage: '256GB',
        mrp: 134900,
        price: 127400,
        imageUrl: 'https://m.media-amazon.com/images/I/61EoCnDyoQL._SX679_.jpg',
        emiPlans: [
          { monthlyAmount: 44967, tenure: 3, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 22483, tenure: 6, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 11242, tenure: 12, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 5621, tenure: 24, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 4297, tenure: 36, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 3385, tenure: 48, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 2842, tenure: 60, interestRate: 10.5, cashback: 7500 },
        ],
      },
      {
        label: '512GB - Desert Titanium',
        color: 'Cosmic Orange',
        storage: '512GB',
        mrp: 154900,
        price: 146900,
        imageUrl: 'https://m.media-amazon.com/images/I/71JGCn1z1TL._SX679_.jpg',
        emiPlans: [
          { monthlyAmount: 51800, tenure: 3, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 25900, tenure: 6, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 12950, tenure: 12, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 6475, tenure: 24, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 4950, tenure: 36, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 3900, tenure: 48, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 3275, tenure: 60, interestRate: 10.5, cashback: 7500 },
        ],
      },
      {
        label: '1TB - Black Titanium',
        color: 'Deep Blue',
        storage: '1TB',
        mrp: 174900,
        price: 165900,
        imageUrl: 'https://m.media-amazon.com/images/I/618vU2qKXQL._SX679_.jpg',
        emiPlans: [
          { monthlyAmount: 58500, tenure: 3, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 29250, tenure: 6, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 14625, tenure: 12, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 7313, tenure: 24, interestRate: 0, cashback: 7500 },
          { monthlyAmount: 5590, tenure: 36, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 4402, tenure: 48, interestRate: 10.5, cashback: 7500 },
          { monthlyAmount: 3697, tenure: 60, interestRate: 10.5, cashback: 7500 },
        ],
      },
    ],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, built-in S Pen, and 200MP camera.',
    variants: [
      {
        label: '256GB - Titanium Black',
        color: 'Titanium Black',
        storage: '256GB',
        mrp: 134999,
        price: 119999,
        imageUrl: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/mobile/y/s/g/-original-imahgfmy2zgqvjmy.jpeg?q=90',
        emiPlans: [
          { monthlyAmount: 42333, tenure: 3, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 21167, tenure: 6, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 10583, tenure: 12, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 5292, tenure: 24, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 4046, tenure: 36, interestRate: 10.5, cashback: 5000 },
          { monthlyAmount: 3187, tenure: 48, interestRate: 10.5, cashback: 5000 },
        ],
      },
      {
        label: '512GB - Titanium Violet',
        color: 'Titanium Violet',
        storage: '512GB',
        mrp: 154999,
        price: 139999,
        imageUrl: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/mobile/w/r/z/-original-imahgfmysgtszenh.jpeg?q=90',
        emiPlans: [
          { monthlyAmount: 49333, tenure: 3, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 24667, tenure: 6, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 12333, tenure: 12, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 6167, tenure: 24, interestRate: 0, cashback: 5000 },
          { monthlyAmount: 4714, tenure: 36, interestRate: 10.5, cashback: 5000 },
          { monthlyAmount: 3713, tenure: 48, interestRate: 10.5, cashback: 5000 },
        ],
      },
    ],
  },
  {
    name: 'OnePlus 15',
    slug: 'oneplus-15',
    brand: 'OnePlus',
    category: 'Smartphones',
    description: 'OnePlus 15 with Snapdragon 8 Gen 5, Hasselblad camera, and 100W SUPERVOOC charging.',
    variants: [
      {
        label: '256GB - Flowy Emerald',
        color: 'Flowy Emerald',
        storage: '256GB',
        mrp: 64999,
        price: 59999,
        imageUrl: 'https://m.media-amazon.com/images/I/616kkUbRg4L._SX679_.jpg',
        emiPlans: [
          { monthlyAmount: 20000, tenure: 3, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 10000, tenure: 6, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 5000, tenure: 12, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 2500, tenure: 24, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 1991, tenure: 36, interestRate: 10.5, cashback: 2000 },
          { monthlyAmount: 1569, tenure: 48, interestRate: 10.5, cashback: 2000 },
        ],
      },
      {
        label: '512GB - Silky Black',
        color: 'Silky Black',
        storage: '512GB',
        mrp: 69999,
        price: 64999,
        imageUrl: 'https://m.media-amazon.com/images/I/61KXgizurpL._SX679_.jpg',
        emiPlans: [
          { monthlyAmount: 21667, tenure: 3, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 10833, tenure: 6, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 5417, tenure: 12, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 2708, tenure: 24, interestRate: 0, cashback: 2000 },
          { monthlyAmount: 2157, tenure: 36, interestRate: 10.5, cashback: 2000 },
          { monthlyAmount: 1700, tenure: 48, interestRate: 10.5, cashback: 2000 },
        ],
      },
    ],
  },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Product.deleteMany({});
    console.log('Cleared existing products...');
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully!`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();