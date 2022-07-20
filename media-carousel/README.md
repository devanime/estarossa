# Media Carousel
This component provides an owl-based media carousel. This carousel supports both image and video slides with optional captions.
Multiple carousels can exist on a single page.

## CSS
The CSS has the following overridable SASS features:
* navigation inset
* navigation color + hover
* navigation SVG height + width
* play icon color
* play icon circle + triangle size
* play icon svg
* slide animation
* caption background color
* caption toggle background color

## Javascript
The javascript comes out of the box with no customization. If a media carousel exists on a page,
a hash state is applied to the page which in turn will initialize the media carousel(s).

## PHP
There is a **MediaCarouselView** class and associated component markup. Feed the view class a **MediaGalleryPost** object or
an array of **MediaCarouselSlide** slides with optional first slide declaration and optional override for the default info_icon.

The **MediaCarouselSlide** class supports **WP_Image** images and **VideoPost** videos with an optional caption.

## Usage
Below are the different ways of calling the Media Carousel:

```php
MediaCarouselView::createFromGalleryPost($GalleryPost);
new MediaCarouselView($slides, $first, $info_icon);
```

To create a slide:

```php
MediaCarouselSlide::createFromWPImage($image);
MediaCarouselSlide::createFromVideoPost($VideoPost, true);
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
