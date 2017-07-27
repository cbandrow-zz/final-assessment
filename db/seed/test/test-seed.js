
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
        }
      ]);
    })
    .then(function(){
      return knex('orders').del()
        .then(function () {
          return knex('orders').insert([
            {
              id: 1,
              total_price: 100.00,
              date: 'February 33rd, 2017'
            }
          ]);
        });
    });
};
