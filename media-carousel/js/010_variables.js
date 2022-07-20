var owlSettings = Estarossa.applyFilters('media-carousel/owl-settings', {
    margin: 10,
    items: 1,
    dots: false,
    nav: true,
    navText: ['&lsaquo;', '&rsaquo;'],
    responsive: {
        0: {
            items: 2
        },
        768: {
            items: 3
        }
    }
});
