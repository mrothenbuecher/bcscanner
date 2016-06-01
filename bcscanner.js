(function($) {

    $.fn.bcscanner = function(options) {

        var $input = this;
        var settings = $.extend({
            hidden: true,
            interval: 50,
            onChar: [{
                charCode: 13,
                func: function() {}
            }]
        }, options);

        if (settings.hidden) {
            if (!$('#bcscannerstyle')) {
                $("<style id='bcscannerstyle' type='text/css'> .bcscanner{ position: absolute; top: -999999px;} </style>").appendTo("head");
            }
            $input.addClass("bcscanner");
        }

        this.start = function() {
            if (!$input.data("intervalID")) {
                var intervalID = setInterval(function() {
                    $input.focus();
                }, settings.interval);
                $input.data("intervalID", intervalID);
            } else {
                console.error("scanner already running on this field");
            }
        };

        this.stop = function() {
            if ($input.data("intervalID")) {
                clearInterval($input.data("intervalID"));
                $input.data("intervalID", "");
            }
        };

        this.destroy = function() {
            $input.stop();
            $input.unbind('keypress');
            $input.removeClass("bcscanner");
            if (!$(body).find('.bcscanner')) {
                $('#bcscannerstyle').remove();
            }
        };

        if (settings.interval > 0) {
            this.start();
        }

        if (settings.onChar && settings.onChar.length > 0) {
            $input.on('keypress', function(event) {
                $.each(settings.onChar, function() {
                    if (event.charCode == this.charCode) {
                        this.func($input, event);
                    }
                });
            });
        }

        return this;
    };

}(jQuery));
