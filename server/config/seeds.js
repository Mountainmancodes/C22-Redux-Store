// server/config/seeds.js

const db = require('./connection');
const { User, Product, Category } = require('../models');
// Commented out the cleanDB function to prevent deleting existing data
// const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Check if data already exists in the collections
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();

    if (categoryCount > 0 || productCount > 0 || userCount > 0) {
      console.log('Database already contains data. Seeding aborted.');
      process.exit();
    }

    // If no data exists, proceed to seed the database
    const categories = await Category.insertMany([
      { name: 'Food' },
      { name: 'Household Supplies' },
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Toys' },
    ]);

    console.log('categories seeded');

    const products = await Product.insertMany([
      {
        name: 'Tin of Cookies',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'cookie-tin.jpg',
        category: categories[0]._id,
        price: 2.99,
        quantity: 500,
      },
      {
        name: 'Canned Coffee',
        description:
          'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
        image: 'canned-coffee.jpg',
        category: categories[0]._id,
        price: 1.99,
        quantity: 500,
      },
      {
        name: 'Toilet Paper',
        description:
          'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna.',
        image: 'toilet-paper.jpg',
        category: categories[1]._id,
        price: 7.99,
        quantity: 20,
      },
      {
        name: 'Handmade Soap',
        description:
          'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis.',
        image: 'soap.jpg',
        category: categories[1]._id,
        price: 3.99,
        quantity: 50,
      },
      {
        name: 'Set of Wooden Spoons',
        description:
          'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut.',
        image: 'wooden-spoons.jpg',
        category: categories[1]._id,
        price: 14.99,
        quantity: 100,
      },
      {
        name: 'Camera',
        description:
          'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex.',
        image: 'camera.jpg',
        category: categories[2]._id,
        price: 399.99,
        quantity: 30,
      },
      {
        name: 'Tablet',
        description:
          'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi.',
        image: 'tablet.jpg',
        category: categories[2]._id,
        price: 199.99,
        quantity: 30,
      },
      {
        name: 'Tales at Bedtime',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum.',
        image: 'bedtime-book.jpg',
        category: categories[3]._id,
        price: 9.99,
        quantity: 100,
      },
      {
        name: 'Spinning Top',
        description:
          'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
        image: 'spinning-top.jpg',
        category: categories[4]._id,
        price: 1.99,
        quantity: 1000,
      },
      {
        name: 'Set of Plastic Horses',
        description:
          'Sed a mauris condimentum, elementum enim in, rhoncus dui.',
        image: 'plastic-horses.jpg',
        category: categories[4]._id,
        price: 2.99,
        quantity: 1000,
      },
      {
        name: 'Teddy Bear',
        description:
          'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui.',
        image: 'teddy-bear.jpg',
        category: categories[4]._id,
        price: 7.99,
        quantity: 100,
      },
      {
        name: 'Alphabet Blocks',
        description:
          'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet.',
        image: 'alphabet-blocks.jpg',
        category: categories[4]._id,
        price: 9.99,
        quantity: 600,
      },
    ]);

    console.log('products seeded');

    await User.create({
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
      orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id],
        },
      ],
    });

    await User.create({
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345',
    });

    console.log('users seeded');

    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});