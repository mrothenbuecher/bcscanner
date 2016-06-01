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
            $input.addClass("bcscanner-hidden");
        }

        $input.addClass("bcscanner");

        this.start = function(interval) {
            if (interval) {
                settings.interval = interval;
            } else {
                if (!settings.interval || settings.interval <= 0) {
                    settings.interval = 50;
                }
            }

            if (!$input.data("intervalID")) {
                var intervalID = setInterval(function() {
                    $input.focus();
                }, settings.interval);
                $input.data("intervalID", intervalID);
                $input.addClass('bcscanner-started');
            } else {
                console.error("scanner already running on this field");
            }
            $input.removeClass('bcscanner-stopped');
        };

        this.stop = function() {
            if ($input.data("intervalID")) {
                clearInterval($input.data("intervalID"));
                $input.data("intervalID", "");
            }
            $input.removeClass('bcscanner-started');
            $input.addClass('bcscanner-stopped');
        };

        this.destroy = function() {
            $input.stop();
            $input.unbind('keypress');
            $input.removeClass("bcscanner");
            $input.removeClass("bcscanner-hidden");
            if (!$(body).find('.bcscanner')) {
                $('#bcscannerstyle').remove();
            }
        };

        if (settings.interval && settings.interval > 0) {
            this.start();
        } else {
            this.stop();
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
