
exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(() => knex('items').del())
    .then(function () {
      return knex('items').insert([
        {
          id: 1,
          title: 'Nintendo Switch',
          item_description: 'The new home video game system from Nintendo. In addition to providing single and multiplayer thrills at home, the Nintendo Switch system can be taken on the go so players can enjoy a full home console experience anytime, anywhere.',
          picture_url: 'http://www.nintendo.com/switch/etRgxnAu0zRX4bmWnt9K628wG7YQUI6t/images/switch/buy-now/bundle_color_console.jpg',
          price: 299.00,
        },
        {
          id: 2,
          title: 'Playstation 4',
          item_description: 'The new slim PlayStation 4 opens the door to extraordinary journeys through immersive new gaming worlds and a deeply connected gaming community.',
          picture_url: 'https://static1.gamespot.com/uploads/original/123/1239113/3126139-ps4.jpg',
          price: 269.00,
        },
        {
          id: 3,
          title: 'Xbox ONE',
          item_description: 'The only console with 4k Ultra HD Blu-ray, 4k streaming, and HDR. Play over 100 console exclusives and a growing library of Xbox 360 Games.',
          picture_url: 'https://ea.vox-cdn.com/production/polygon-xb1-review/images/xbox/living/wide-a467935d.jpg',
          price: 247.90,
        },
        {
          id: 4,
          title: 'Canon 6d Mark II Digital SLR Camera Body',
          item_description: 'For superb performance on the go, the Canon EOS 6D Mark II camera puts full-frame performance into a compact, fully featured DSLR.',
          picture_url: 'http://www.imaging-resource.com/PRODS/canon-6d-mark-ii/Z-canon-6d2-beauty-kit.jpg',
          price: 1999.90,
        },
        {
          id: 5,
          title: 'Fujifilm X100F 24.3 MP APS-C Digital Camera',
          item_description: 'The Fujifilm X100F signifies the achievement of new heights in Fujifilm\'s endless pursuit of perfection in photography.',
          picture_url: 'http://www.imaging-resource.com/PRODS/fuji-x100f/ZPR-fuji-x100f-front-left-silver.jpg',
          price: 1299.99,
        },
        {
          id: 6,
          title: 'Canon EF 70-200mm f/4 L IS USM Lens for Canon Digital SLR Cameras',
          item_description: 'Canon\'s EF 70-200mm f/4L IS USM is a lightweight, compact L Series telephoto zoom lens with Image Stabilizer.',
          picture_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Canon_70-200_F4L.jpg',
          price: 1099.99,
        }
      ]);
    });
};
