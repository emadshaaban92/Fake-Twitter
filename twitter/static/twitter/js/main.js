// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    'jquery': 'libs/jquery/jquery.min',
    'underscore': 'libs/underscore/underscore-min',
    'backbone': 'libs/backbone/backbone-min',
    'backbone-tastypie': 'libs/backbone/backbone-tastypie',
    'backbone-mediator': 'libs/backbone/backbone-mediator',
    'backbone-all': 'libs/backbone/backbone-all',
    'mustache': 'libs/mustache/mustache'
  },

  // 3rd party scripts that are not AMD compatible
    shim: {
        // We have a special module 'backbone-all' (defined in 'backbone-all.js') that pulls in backbone
        // as well as all the Backbone.js plugins that we always use.
        'backbone-tastypie': ['backbone'],
        'backbone-mediator': ['backbone']
    }
});
