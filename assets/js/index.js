// Tech Stack icon toggles
var languagesIcons = document.querySelector(".languages-icons");
var frameworksIcons = document.querySelector(".frameworks-icons");
var databasesIcons  = document.querySelector(".database-icons");

var salesforceIcons = document.querySelector(".salesforce-icons");

var toggleIcons = function (e) {
    var id = e.target.id;
    languagesIcons.classList.add("hidden");
    if (salesforceIcons) salesforceIcons.classList.add("hidden");

    if (id === "toggle-languages") {
        languagesIcons.classList.remove("hidden");
    } else if (id === "toggle-salesforce") {
        if (salesforceIcons) salesforceIcons.classList.remove("hidden");
    }
};

document.querySelectorAll("h4").forEach(function (h4) {
    h4.addEventListener("click", toggleIcons);
});

var h4s = document.querySelectorAll("h4");
for (var i = 0; i < h4s.length; i++) {
    h4s[i].addEventListener("click", function () {
        var previousActiveH4 = document.querySelector(".tech-stack .active");
        if (previousActiveH4) {
            previousActiveH4.classList.remove("active");
        }
        this.classList.toggle("active");
    });
}

// Timeline scroll animation + gold progress bar
(function ($) {
    $(function () {

        $(window).on('scroll', fnOnScroll);
        $(window).on('resize', fnOnResize);

        var agTimeline          = $('.js-timeline'),
            agTimelineLine      = $('.js-timeline_line'),
            agTimelineLineProgress = $('.js-timeline_line-progress'),
            agTimelinePoint     = $('.js-timeline-card_point-box'),
            agTimelineItem      = $('.js-timeline_item'),
            agOuterHeight       = $(window).outerHeight(),
            agHeight            = $(window).height(),
            f                   = -1,
            agFlag              = false,
            agPosY              = 0;

        function fnOnScroll() {
            agPosY = $(window).scrollTop();
            fnUpdateFrame();
        }

        function fnOnResize() {
            agPosY  = $(window).scrollTop();
            agHeight = $(window).height();
            fnUpdateFrame();
        }

        function fnUpdateWindow() {
            agFlag = false;

            if (!agTimelineItem.length) return;

            agTimelineLine.css({
                top:    agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
                bottom: 0
            });

            if (f !== agPosY) {
                f = agPosY;
                fnUpdateProgress();
            }
        }

        function fnUpdateProgress() {
            var agBottom = agTimeline.offset().top + agTimeline.outerHeight();
            var i = agBottom + agPosY - $(window).scrollTop();
            var a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
            var n = agPosY - a + agOuterHeight * 0.95;

            if (i <= agPosY + agOuterHeight * 0.95) { n = i - a; }
            agTimelineLineProgress.css({ height: n + "px" });

            agTimelineItem.each(function () {
                var itemTop = $(this).find(agTimelinePoint).offset().top;
                if ((itemTop + agPosY - $(window).scrollTop()) < agPosY + 0.95 * agOuterHeight) {
                    $(this).addClass('js-ag-active');
                } else {
                    $(this).removeClass('js-ag-active');
                }
            });
        }

        function fnUpdateFrame() {
            if (!agFlag) requestAnimationFrame(fnUpdateWindow);
            agFlag = true;
        }

        // Trigger once on load
        fnOnScroll();
    });
})(jQuery);
