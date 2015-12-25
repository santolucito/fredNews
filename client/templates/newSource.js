Session.setDefault("name", "");

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
   },
   "keyup input" : function (){
     var rssLink = $('#rssLink').val();
     console.log( $.jGFeed(rssLink) );
     //Session.set("name")
   }
 });

Template.newSource.helpers({
  name : function(){
    return Session.get("name");
  }

})
