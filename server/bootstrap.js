// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Sources.find().count() === 0) {
    var data = [
      {name: "Amherst Student", link:'http://amherststudent.amherst.edu/?q=rss.xml'},
      {name: "Yale Daily News", link:'http://news.yale.edu/news-rss'}
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(s) {
      var s_id = Sources.insert({name: s.name,
                                 link: s.link});
      timestamp += 1; // ensure unique timestamp.
      });
    }
  }
);
