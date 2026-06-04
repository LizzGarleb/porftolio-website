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

// ── Custom Cursor ──────────────────────────────────────────
(function () {
    // Only run on non-touch devices
    if (!window.matchMedia('(hover: hover)').matches) return;

    var dot  = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    var mouseX = 0, mouseY = 0;
    var ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot snaps instantly to cursor
        dot.style.transform = 'translate(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px)';
    });

    // Ring lags slightly behind using lerp
    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.transform = 'translate(' + (ringX - 16) + 'px, ' + (ringY - 16) + 'px)';
        requestAnimationFrame(animateRing);
    })();

    // Hover state on interactive elements
    var interactiveSelector = 'a, button, [role="button"], .card-btn, .resume-btn, .prevBtn, .nextBtn, .menu-toggle, .cert-img, .social-group, .bar';
    document.querySelectorAll(interactiveSelector).forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        });
        el.addEventListener('mouseleave', function () {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        });
    });

    // Click pulse
    document.addEventListener('mousedown', function () {
        dot.classList.add('clicking');
        ring.classList.add('clicking');
    });
    document.addEventListener('mouseup', function () {
        dot.classList.remove('clicking');
        ring.classList.remove('clicking');
    });
})();
