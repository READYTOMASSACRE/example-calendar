Package.describe({
  name: 'example-calendar',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',

  ]);

  api.addFiles('assets/stylesheets/bootstrap.min.css');
  api.addFiles('assets/stylesheets/index.css');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
