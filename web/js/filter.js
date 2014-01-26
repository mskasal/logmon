var Filter = function() {
    "use strict";

    this.subscribers = {
        'change': []
    };
    this.tab = null;
    this.query = {
        url: "../dummies/logMonEntries.json",
        type: "GET",
        data: {
            project: null,
            type: null,
            after: null,
            before: null,
            contains: null,
            limit: null
        }
    };
    this.init();
};

Filter.prototype.init = function() {
    "use strict";

    this.bind();
};

Filter.prototype.bind = function() {
    "use strict";
    var that = this;

    $(".search-button").click(function() {
        var keyword = $(".search-input").val();
        that.query.data.contains = keyword;
        that.onChange();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        that.query.data.type = $(e.target).data("type"); // activated tab
        var tab = $(e.target).data("type");

        if (tab === "")
            tab = "all";
        that.tab = tab;
        that.onChange();
    });

    //TODO bindlar yapılcak auto refresh özelliği eklenecek falan filan
};

Filter.prototype.on = function(eventName, callback) {
    "use strict";

    this.subscribers[eventName].push(callback);
};

Filter.prototype.onChange = function() {
    "use strict";

    for (var i in this.subscribers['change']) {
        var callback = this.subscribers['change'][i];
        callback();
    }
};