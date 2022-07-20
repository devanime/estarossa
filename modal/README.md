# Modal
An in-depth modal system that supports custom animations, triggers and builders. Multiple modals can exist on a single page,
however one should differentiate the modal identifiers by using a post ID. For example: 

```html
<a href="#my-example-post-463" class="js-modal-trigger"></a>
<div class="modal" id="my-example-post-462">...</div>
<div class="modal" id="my-example-post-463">...</div>
<div class="modal" id="my-example-post-464">...</div>
``` 

## CSS
The CSS has the following overridable SASS features:
* background color
* background opacity
* max-width
* text alignment
* container background
* container color
* container mobile padding
* container padding
* container size
* z-index
* animation + duration and timing
* box border radius
* aspect ratio
* close size
* close color + hover
* close position top/right

## Javascript
The javascript is discrete with no customization. The click events for `.js-modal-trigger` must be abide by the rules
`.js-modal-trigger > a, a.js-modal-trigger`, whereas for `js-modal-builder` can be on any element.
Focus state is applied to the modal when shown.

## PHP
There is a **ModalView** class and associated component markup for added convenience. The **ModalView** class supports three types of modals:
1. Box
2. Centered
3. Video

### There are three static constructors:
#### Create
Create a modal and display it in real-time. The `$format_content` flag will wrap the `$content` in an `apply_filters('the_content', $content);` block.
```php
ModalView::create($id, $type, $content, $format_content);
```

#### Load
Create a modal and add it to a queue, this will not display the modal until the `ModalView::unloadAll()` static method is called.
```php
ModalView::load($id, $type, $content, $format_content);
```

#### UnloadAll
This will unload all modals in a queue. This is typically used in the footer of a website to unload all filtered modals at once.
```php
ModalView::unloadAll();
```

## Usage
#### Modal Trigger
Utilizes the class `.js-modal-trigger`, which will trigger a modal with custom content.

```html
<a href="#my-example-post" class="js-modal-trigger"></a>
<div class="modal" id="my-example-post">
    <div class="modal__container">
        <div class="modal__content">
            <?= $content ?>
        </div>
        <button class="modal__close" type="button" aria-label="Close modal">&#10005;</button>
    </div>
</div>
```

#### Modal Builder
Utilizes the class `.js-modal-builder` and the data attribute `data-modal-source`.
This will trigger a modal that will be automatically built by the `data-modal-source` attribute.
All contents within the targeted data source, will get placed within the `.modal__content` container in the modal.

**Note:** You do not need to assign the `href` attribute to the link in this scenario.

```html
<a class="js-modal-builder" data-modal-target="#example-modal" data-modal-source=".content-to-apply"></a>
<div class="test-div">
    <div class="another-test-div">
        <div class="content-to-apply">
            <h2>Title</h2>
            <p>Content</p>
            <p>Some more content</p>
        </div>
    </div>
</div>
```

The modal output will look like this:

```html
<div class="modal" id="#example-modal">
    <div class="modal__container">
        <div class="modal__content">
            <h2>Title</h2>
            <p>Content</p>
            <p>Some more content</p>
        </div>
        <button class="modal__close" type="button" aria-label="Close modal">&#10005;</button>
    </div>
</div>
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
