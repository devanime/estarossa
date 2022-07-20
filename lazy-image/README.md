# Lazy Image
This component allows for lazy image loading. Images will load on scroll, as opposed to loading all images on page load.
This component works in tandem with the **WP_Image** plugin.

## CSS
The CSS has the following overridable SASS features:
* z-index
* animation : choose an animation from our [animation library](https://devanime.beanstalkapp.com/estarossa/browse/git/common/scss/_animations.scss?ref=b-2.0),
and control its duration and timing.

## Javascript
The javascript is discrete with no customization. Once the bottom of the page is reached via scroll,
the lazy image queue is then checked. Loading a max of 3 more posts at a time,
applying the `.in-view` class once the image has been loaded.

## PHP
There is a **LazyImageView** class and associated component markup for added convenience.
Simply, run your image through this view, and the lazy image will be assembled with the appropriate attributes.

## Usage
Instead of outputting an img tag in your markup, instead run it through the **LazyImage** static constructor.

```php
LazyImageView::create($image);
```

Here is example markup of the image returned:

```html
<img class="lazy-image-loaded {in-view}" src="#" alt="#" width="XXX" height="XXX">
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
