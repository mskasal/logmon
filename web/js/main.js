var logModel = new LogModel();



var logView = new LogView({
    el: $("#all .entries"),
    events: {
        'click .btn': 'test'
    },
    fetch: function() {
        var that = this;
        logModel.fetch({
            success: function(data) {
                that.data = data.get("data");
            },
            data: {
                keyword: "asd"
            }

        });
    },
    render: function(ev) {
        var dom = "{{#entries}}<li>{{date}}{{id}}</li>{{/entries}}";
        var rendered = Mustache.render(dom, that.data);
        console.log("ev");
        $(logView.el).append(rendered);
    }
});