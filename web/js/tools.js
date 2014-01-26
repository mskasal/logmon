var Tools = function() {
    "use strict";
};

Tools.prototype.Ajax = function(type, url, data) {
    "use strict";
    return $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        data: data
    });

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