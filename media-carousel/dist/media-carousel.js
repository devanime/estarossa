(function(window, document, $, undefined) {
    Estarossa.addAction(Estarossa.REGISTER, function() {
        var owlSettings = Estarossa.applyFilters("media-carousel/owl-settings", {
            margin: 10,
            items: 1,
            dots: false,
            nav: true,
            navText: ["&lsaquo;", "&rsaquo;"],
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });

        function CarouselGTM(bus) {
            this.bus = bus;
            this.currentIndex = 1;
            this.currentPage = 0;
            bus.addAction("selected", this.onSelect, 10, this);
            bus.addAction("navigate", this.onNavigate, 10, this)
        }
        CarouselGTM.prototype = {
            onSelect: function(selected) {
                if (this.currentIndex === selected.index) {
                    return
                }
                this.currentIndex = selected.index;
                Estarossa.doAction(Estarossa.GTM_INTERACTION, {
                    type: "carouselSelect",
                    $el: selected.$el,
                    label: selected.$caption.text() || selected.$el.find("img").attr("alt"),
                    index: selected.index,
                    media: selected.type
                })
            },
            onNavigate: function(event) {
                var currentPage = event.item.index;
                var direction = currentPage > this.currentPage ? "next" : "prev";
                this.currentPage = currentPage;
                Estarossa.doAction(Estarossa.GTM_INTERACTION, {
                    type: "carouselNavigate",
                    $el: $(event.target),
                    label: direction,
                    index: currentPage
                })
            }
        };

        function Selected($slide) {
            var self = this;
            self.$el = $slide;
            self.$caption = $slide.parent().find(".media-carousel__caption");
            self.index = $slide.parents(".owl-item").index() + 1;
            self.type = $slide.attr("data-video-id") ? "video" : "image";
            self.id = $slide.attr("data-video-id") || $slide.attr("data-image-id")
        }

        function Carousel($container) {
            var self = this;
            self.$container = $container;
            self.bus = new EventManager;
            self.bus.resetting = false;
            self.selection = new SelectionWindow($container.find(".media-carousel__selection-wrap"), self.bus);
            self.slider = new Slider($container.find(".media-carousel__slides"), self.bus);
            Estarossa.addAction(Estarossa.HASH_STATE_CHANGE, self.reset, 10, self);
            self.reset();
            $(window).on("load", function() {
                new CarouselGTM(self.bus)
            })
        }
        Carousel.prototype = {
            reset: function() {
                var self = this;
                self.bus.resetting = true;
                self.selection.reset(true);
                self.slider.reset();
                self.bus.resetting = false
            }
        };

        function SelectionWindow($wrap, bus) {
            var self = this;
            self.bus = bus;
            self.$wrap = $wrap;
            self.$selection = $wrap.find(".media-carousel__selection");
            self.$initial = self.$selection.find(".media-carousel__selection__initial");
            self.$captionToggle = $wrap.find(".media-carousel__selection__toggle-caption");
            self.$selectionCaption = $wrap.find(".media-carousel__selection__caption");
            self.$captionToggle.click(function(e) {
                self.$wrap.toggleClass("media-carousel__selection-wrap--caption-active")
            });
            self.bus.addAction("selected", self.onSelection, 10, self)
        }
        SelectionWindow.prototype = {
            reset: function(showInit) {
                var self = this;
                Estarossa.doAction(Estarossa.VIDEO_PAUSE);
                self.$selection.find(".video-player").addClass("video-player--inactive");
                self.$selection.find(".media-carousel__selection__photo--active").removeClass("media-carousel__selection__photo--active");
                self.$initial.toggleClass("media-carousel__selection__initial--hide", !showInit).css("display", "")
            },
            lockHeight: function(clear) {
                var self = this;
                self.$selection.css("min-height", "");
                if (!clear) {
                    self.$selection.css("min-height", self.$selection.height())
                }
            },
            onSelection: function(selected) {
                var self = this;
                self.doTransition();
                if (selected.type === "video" || !window.mediaCarouselImages.hasOwnProperty(selected.id)) {
                    self.$selection.find(".media-carousel__selection__photo--active").removeClass("media-carousel__selection__photo--active");
                    return
                }
                self.reset(false);
                var $image = self.getImageEl(selected);
                $image.addClass("media-carousel__selection__photo--active");
                self.$wrap.toggleClass("media-carousel__selection-wrap--caption", selected.$caption.length > 0).removeClass("media-carousel__selection-wrap--caption-active");
                setTimeout(function() {
                    if (selected.$caption.length) {
                        self.$selectionCaption.html(selected.$caption.clone())
                    } else {
                        self.$selectionCaption.empty()
                    }
                }, 600)
            },
            doTransition: function() {
                var self = this;
                self.scrollWindow();
                self.lockHeight();
                self.$selection.addClass("media-carousel__selection--transition");
                setTimeout(function() {
                    self.$selection.removeClass("media-carousel__selection--transition");
                    self.lockHeight(true)
                }, 150)
            },
            getImageEl: function(image) {
                var self = this;
                var $image = self.$selection.find("#image_" + image.id);
                if ($image.length) {
                    return $image
                }
                $image = $("<div>");
                $image.attr({
                    id: "image_" + image.id,
                    class: "media-carousel__selection__photo"
                });
                $image.html(window.mediaCarouselImages[image.id]);
                self.$selection.append($image);
                return $image
            },
            scrollWindow: function() {
                var self = this;
                if (!self.bus.resetting) {
                    setTimeout(function() {
                        var scrollTarget = self.$selection.offset().top - Estarossa.applyFilters("header-height");
                        if (Estarossa.viewport.scrollPosition().top > scrollTarget) {
                            $("html, body").animate({
                                scrollTop: scrollTarget
                            }, 350)
                        }
                    }, 150)
                }
            }
        };

        function Slider($el, bus) {
            var self = this;
            self.$slider = $el;
            self.bus = bus;
            self.$links = self.$slider.find(".media-carousel__link");
            self.$links.on("click", self.onClick.bind(self));
            self.$slider.addClass("owl-carousel owl-theme").owlCarousel(owlSettings).on("changed.owl.carousel", self.onSlideChange.bind(self));
            self.$nav = self.$slider.find(".owl-nav");
            self.$nav.find("button").data("gtm", 0);
            if (self.$nav.find("svg").length) {
                self.$nav.addClass("owl-nav--svg")
            }
            Estarossa.addAction(Estarossa.LAYOUTEND, self.alignNav, 10, self);
            self.bus.addAction("selected", self.onSelect, 10, self)
        }
        Slider.prototype = {
            onClick: function(e) {
                e.preventDefault();
                var self = this;
                var $this = $(e.currentTarget);
                self.bus.doAction("selected", new Selected($this))
            },
            reset: function() {
                var self = this;
                self.$slider.trigger("to.owl.carousel", 0);
                self.bus.doAction("selected", new Selected(self.$links.first()))
            },
            onSelect: function(selected) {
                var self = this;
                self.$links.removeClass("selected");
                selected.$el.addClass("selected")
            },
            alignNav: function() {
                this.$nav.css("top", this.$slider.find(".media-carousel__link").outerHeight() / 2)
            },
            onSlideChange: function(event) {
                var self = this;
                if (event.property.name === "position") {
                    Estarossa.updateLayout();
                    self.bus.doAction("navigate", event)
                }
            }
        };
        $(".media-carousel").each(function() {
            new Carousel($(this))
        })
    }, 9)
})(window, document, jQuery);