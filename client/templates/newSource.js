Template.newSource.events({
   "submit .new-source": function (event) {
     // Prevent default browser form submit
     event.preventDefault();

     var text = event.target.text.value;
     Sources.insert({link: text});
     console.log(Sources.find().fetch())

     //TODO
     //var nameFromFeed = getName(text)
     //Sources.update({link: text},{name:nameFromFeed});

     // Clear form
     event.target.text.value = "";
     Router.go('/');
   }
 });
