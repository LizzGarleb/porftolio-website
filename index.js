var languagesIcons = document.querySelector(".languages-icons");
var frameworksIcons = document.querySelector(".frameworks-icons");
var databasesIcons = document.querySelector(".database-icons");

var toggleIcons = function (e) {
    // Get the id of the h4 tag that was clicked
    var id = e.target.id;

    // Hide all the icons
    languagesIcons.classList.add("hidden");
    frameworksIcons.classList.add("hidden");
    databasesIcons.classList.add("hidden");

    // Show the icons corresponding to the h4 tag that was clicked
    if (id === "toggle-languages") {
        languagesIcons.classList.remove("hidden");
    } else if (id === "toggle-frameworks") {
        frameworksIcons.classList.remove("hidden");
    } else if (id === "toggle-databases") {
        databasesIcons.classList.remove("hidden");
    }
};

// Attach the toggleIcons function to the click event of the h4 tags
document.querySelectorAll("h4").forEach(function (h4) {
    h4.addEventListener("click", toggleIcons);
});







var h4s = document.querySelectorAll("h4");

for (var i = 0; i < h4s.length; i++) {
    h4s[i].addEventListener("click", function () {
        var previousActiveH4 = document.querySelector(".active");

        if (previousActiveH4) {
            previousActiveH4.classList.remove("active");
        }

        this.classList.toggle("active");
    });
}





const sidebar = document.getElementById("sidebar");

window.addEventListener("scroll", () => {
    // Get the position of the top navigation
    const header = document.querySelector("header");
    const headerPosition = header.getBoundingClientRect();

    // Show or hide the sidebar based on scroll position
    if (headerPosition.bottom <= 0) {
        sidebar.classList.add("active");
    } else {
        sidebar.classList.remove("active");
    }
});








(function ($) {
    $(function () {


        $(window).on('scroll', function () {
            fnOnScroll();
        });

        $(window).on('resize', function () {
            fnOnResize();
        });


        var agTimeline = $('.js-timeline'),
            agTimelineLine = $('.js-timeline_line'),
            agTimelineLineProgress = $('.js-timeline_line-progress'),
            agTimelinePoint = $('.js-timeline-card_point-box'),
            agTimelineItem = $('.js-timeline_item'),
            agOuterHeight = $(window).outerHeight(),
            agHeight = $(window).height(),
            f = -1,
            agFlag = false;

        function fnOnScroll() {
            agPosY = $(window).scrollTop();

            fnUpdateFrame();
        }

        function fnOnResize() {
            agPosY = $(window).scrollTop();
            agHeight = $(window).height();

            fnUpdateFrame();
        }

        function fnUpdateWindow() {
            agFlag = false;

            agTimelineLine.css({
                top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
                bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
            });

            f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
        }

        function fnUpdateProgress() {
            var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

            i = agTop + agPosY - $(window).scrollTop();
            a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
            n = agPosY - a + agOuterHeight / 2;
            i <= agPosY + agOuterHeight / 2 && (n = i - a);
            agTimelineLineProgress.css({ height: n + "px" });

            agTimelineItem.each(function () {
                var agTop = $(this).find(agTimelinePoint).offset().top;

                (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
            })
        }

        function fnUpdateFrame() {
            agFlag || requestAnimationFrame(fnUpdateWindow);
            agFlag = true;
        }


    });
})(jQuery);




const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const numCards = document.querySelectorAll('.card').length;
    if (currentIndex < numCards - 1) {
        currentIndex++;
        moveCarousel();
    }
});

function moveCarousel() {
    const cardWidth = document.querySelector('.card').offsetWidth;
    const newPosition = -currentIndex * (cardWidth + 20); // 20px gap between cards
    carousel.style.transform = `translateX(${newPosition}px)`;
}
