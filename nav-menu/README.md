# Navigation Menu
This component overrides and expands upon the WordPress Primary Navigation menu.

## CSS
The CSS has the following overridable SASS features:
* responsive breakpoint
* toggle font-size
* toggle padding
* toggle color + hover
* toggle bar color + hover
* toggle bar width + height + spacing
* toggle border radius
* toggle placement
* overlay background
* overlay color
* overlay padding
* overlay z-index
* list font-size
* list padding
* list item color + hover
* list item open color + hover
* list item current color
* sub-list font-size
* sub-list padding
* sub-list handle font-size
* sub-list handle font weight
* sub-list handle spacing
* sub-list link padding
* sub-list item color + hover
* sub-list item open color
* sub-list symbol
* sub-list open symbol
* navigation animation-in + animation-out
* navigation overlay animation-in + animation-out
* navigation sub-list animation-in + animation-out

## Javascript
The javascript comes out of the box with no customization.
Handles the opening/closing and mouse enter/leave behavioral actions of the standard and sub-list menus.

## PHP
There is a **NavMenuController** class, which hooks into `nav_menu_css_class` and adds the appropriate BEM class to the menu item based on its depth.

There is a **NavMenuView** class and associated component markup. This class is responsible for retrieving the specified menu data from the WordPress backend
and assembling a responsive or list-only menu.

## Usage
There are three static constructors of the **NavMenuView** class:

#### Create
A general method to create a navigation menu.

```php
NavMenuView::create($menu_name, $menu_options, $config);
```

#### Create Responsive
A method that calls NavMenuView::create, with the config option being `['responsive' => true]`.
This will create a responsive detailed navigation menu.

#### Create List
A method that calls NavMenuView::create, with the config option being `['list_only' => true]`.
This will create a list-only navigation menu. This variant has minimal CSS.

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
