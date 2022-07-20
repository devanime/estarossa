# Toggle
This directive enables "toggle" functionality among elements. This can support "one-to-one" *and* "one-to-many" relationships.
An example of this directive would be an array of tabs, and their associated tab-panels.

## CSS
The CSS has the following overridable SASS features:
* z-index
* animation : choose an animation from our [animation library](https://devanime.beanstalkapp.com/estarossa/browse/git/common/scss/_animations.scss?ref=b-2.0).

## Javascript
The javascript is discrete with limited customization. This logic interacts with [hash-state](https://devanime.beanstalkapp.com/estarossa/browse/git/common/js/040_hash-state.js?ref=b-2.0).
Depending on the state of the hash, the toggle is activated.

## Usage
By default, an element with the attribute `data-toggle-target` will not be displayed. This can be negated by adding the `.toggle-active` class.

```html
<a href="#example-a">Example A</a>
<a href="#example-b">Example B</a>
<div class="toggle-active" data-toggle-target="example-a"></div>
<div data-toggle-target="example-b"></div>
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
