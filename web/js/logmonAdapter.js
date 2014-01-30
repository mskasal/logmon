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

    this.datePicker();
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

LogmonAdapter.prototype.datePicker = function() {
    var that = this;
    $('.filtered-date').daterangepicker({
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 15 Days': [moment().subtract('days', 14), moment()],
            },
            startDate: moment().subtract('days', 29),
            endDate: moment(),
            dateLimit: {
                d: 15
            },
            showDropdowns: true,
            opens: 'left'
        },
        function(start, end) {
            $('.filtered-date').val(start.format('MM/DD/YY') + ' - ' + end.format('MM/DD/YY'));
            that.filterStartDate = start.format('X');
            that.filterEndDate = end.format('X');
            that.updateQuery();
        }
    );

};