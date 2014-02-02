var LogModel = Backbone.Model.extend({
    url: "/dummies/logMonEntries.json",
    initialize: function() {
        console.log("model initilized");
    }
});