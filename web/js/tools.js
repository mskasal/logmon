var Tools = function() {
    "use strict";
};

Tools.prototype.Ajax = function(type, url, data, notify) {
    "use strict";
    var that = this;

    return $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        data: data
    }).always(function(response) {
        that.notifyHandler(response.status, notify);
    });
};

Tools.prototype.notifyHandler = function(status, notify) {
    "use strict";
    var that = this;

    var statusCode = status.code,
        statusMessage = status.message;
    if (notify) {
        if (statusCode === 30 && notify === "error") { //means error
            alertifiy.error(statusMessage);
        } else
        if (statusCode === 20 && notify === "success") { //means success
            alertify.success(statusMessage);
        }
    } else if (notify === "both") {
        if (statusCode === 30) { //means error
            alertifiy.error(statusMessage);
        } else
        if (statusCode === 20) { //means success
            alertify.success(statusMessage);
        }
    }
};

Tools.prototype.ColorLuminance = function(hex, lum) {
    "use strict";

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
};


Tools.prototype.highlight = function(element, word, switchy) {
    "use strict";

    if (switchy === "on")
        element.highlight(word);
    if (switchy === "off")
        element.unhighlight();
};

var tools = new Tools();



var __extends = function(child, parent) {
    "use strict";

    for (var key in parent) {
        if (Object.prototype.hasOwnProperty.call(parent, key)) {
            child[key] = parent[key];
        }
    }

    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
};