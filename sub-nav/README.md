# Sub Navigation
This component will display a sub-navigation menu. This should not be used for your primary navigation menu (See [nav-menu]() for details.)

## CSS
The CSS has the following overridable SASS features:
* responsive-breakpoint
* font-size
* link padding
* link background
* link active color
* link active background
* dropdown color
* dropdown closed height
* dropdown symbol
* horizontal item spacing 

## Javascript
The javascript comes out of the box with no customization. Handles the opening and closing of the sub-navigation,
and handles anchoring if specified.

## PHP
There is a **SubNavView** class and associated component markup. This class will create a static menu from either a WordPress menu or a static array.
There are two config settings:
1. Default : default is used when the number of menu items is less than the `WIDE_MIN` constant.
2. Wide : this setting can be overridden. The default `WIDE_MIN` value is 4, if a menu is classified as **wide**, different CSS is applied.

The **NavLink** class will take in a menu item element, and return its data. It is relied upon in **SubNavView**. 

## Usage
Below are the different ways of calling the Sub Navigation component:

```php
SubNavView::create($items, $config);
SubNavView::createFromMenu($menu_slug, $config);
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
