var LogmonAdapter = function(filter) {
    "use strict";

    LogmonAdapter.__super__.constructor.apply(this, arguments);
    this.listDOM = '<li class="list-group-item entry"> \
                        <div class="entry-info"> \
                            <span class="dot {{type}}"></span> \
                            <div class="time">{{date}}</div> \
                        </div> \
                        <div class="entry-content"> \
                            <div class="content-text">{{text}}</div> \
                        </div> \
                    </li>';
    this.addToListType = "prepend";

    this.filter = filter;
    this.query = this.filter.query;

    this.container = $(".main-container");
    this.bind();
};

__extends(LogmonAdapter, Adapter);

LogmonAdapter.prototype.init = function() {
    "use strict";
    var that = this;
    this.fetch(that.query).then(function() {
        that.render();
    });
};

LogmonAdapter.prototype.bind = function() {
    "use strict";
    var that = this;

    this.filter.on("change", function() {
        that.query = that.filter.query;
        that.init();
    });

};

LogmonAdapter.prototype.render = function() {
    "use strict";
    var that = this;

    var container = this.container.attr("id", this.filter.tab);
    var dataList = [];

    if (this.data.entries.length !== 0) {
        dataList = this.data.entries;
    }

    for (var i in dataList) {
        var entry = dataList[i];
        entry.date = moment.unix(entry.date);

        var renderedList = Mustache.render(this.listDOM, entry);

        if (this.addToListType === "append") {
            container.append(renderedList);
        } else if (this.addToListType === "prepend") {
            container.prepend(renderedList);
        }
    }
};