var Adapter = function() {
    "use strict";

    this.query = null;
    this.fetchProcess = null;
    this.data = null;
};

Adapter.prototype.fetch = function() {
    "use strict";
    var that = this;

    this.fetchProcess = tools.Ajax(this.query.type, this.query.url, this.query.data)
        .done(function(response) {
            that.data = response;
        }).fail(function(jqXHR, textStatus, errorThrown) {});

    return this.fetchProcess;
};

Adapter.prototype.render = function(container) {
    "use strict";
};

Adapter.prototype.refresh = function() {
    "use strict";

    this.fetchProcess.abort();

    this.fetch(this.query);
};


Adapter.prototype.onBeforeRender = function(callback) {
    "use strict";
};
Adapter.prototype.onAfterRender = function(callback) {
    "use strict";
};
Adapter.prototype.onBeforeRequest = function(callback) {
    "use strict";
};
Adapter.prototype.onAfterRender = function(callback) {
    "use strict";
};