# Set Design
A cohesive ecosystem of re-usable front end components and directives. The components/directives include front end PHP templates coupled with presentational front end logic.
Provides maximum control over entities such as design, accessibility, event tracking, structural layout and more.

## Getting Started
Assuming you are in your projects' root directory that you wish to install **Set Design** in, open the **composer.json** file and add the following line to the **require** JSON block:

```php
"devanime/estarossa": "dev-master"
```

Then, navigate to the theme directory:

```php
cd wp-content/themes/{theme-name}
```

Open the **bower.json** file and add the various set design components you anticipate using in your project to the **dependencies** JSON block.
Here is an example of a project with all set design components included:

```php
"estarossa.directives.accessibilty": "../../plugins/estarossa/directives/accessibility",
"estarossa.directives.sticky-header": "../../plugins/estarossa/directives/sticky-header",
"estarossa.directives.toggle": "../../plugins/estarossa/directives/toggle",
"estarossa.google-analytics": "../../plugins/estarossa/google-analytics",
"estarossa.lazy-image": "../../plugins/estarossa/lazy-image",
"estarossa.media-carousel": "../../plugins/estarossa/media-carousel",
"estarossa.modal": "../../plugins/estarossa/modal",
"estarossa.nav-menu": "../../plugins/estarossa/nav-menu",
"estarossa.sub-nav": "../../plugins/estarossa/sub-nav",
"estarossa.tag-manager": "../../plugins/estarossa/tag-manager",
```

### Installing
A step by step series of examples that tell you how to get **Set Design** up and running in your environment:

Ensure you are in your projects' root directory, run the following command:

```linux
composer develop
```

In the event that the command `composer develop` is not configured on your particular project, run this sequence of commands:

```linux
composer install -o
cd wp-content/themes/baa
yarn
bower install
gulp
```

## Confirm Installation
You can confirm the installation by checking the **plugins** directory. You should notice the **estarossa** directory is present.
Also navigate to the theme directory and confirm there is a **bower_components** directory with the various estarossa components we explicitly imported.

### Usage
Set Design uses a javascript action/filter library consistent with that used by WordPress. 

```javascript
Estarossa.addAction(Estarossa.INIT, function(){ /* Do something */ });
``` 

If you need to remove an action later, it is better to use a named function or function expression:

```javascript
var myAction = function(){};
Estarossa.addAction(INIT, myAction);
Estarossa.removeAction(INIT, myAction);
```

On DOM ready, Estarossa fires three actions - `INIT`, `REGISTER`, and `READY`. Any components should hook into the `REGISTER`
event, whereas the theme functions should hook into the `INIT` event. This allows any filters (`addFilter`) set in the
theme to be applied to the components - if `applyFilters` is executed first, an `addFilter` later will have no effect.

`Estarossa(function(){})` is a shorthand function for `Estarossa.addAction(REGISTER, function(){})` - except it also
passes these parameters: `$, _, window, document, ...`. This allows simpler instantiation with optimized minification
for component creation. 

If you are creating a Set Design component that lives outside of the main plugin, and can't be guaranteed that Estarossa
exists yet, it's safest to instantiate like this:

```javascript
$(document).on('Estarossa.init', function(Estarossa){
    Estarossa(function($, _, window, document){
        // Component code
    });
});
``` 

Set Design executes throttled/debounced actions on window resize and scroll events (**050_event-actions.js**) as well as 
changes to the address hash (**040_hash-state.js**). 

There are also convenience methods for viewport width/height and scroll position (**032_viewport.js**).

## Directives And Components
Below is a segmented list of the various directives and components that make up the **Set Design** plugin.
See individual README.md for detailed explanation of each directive/component.

### Directives
1. [Accessibility](https://devanime.beanstalkapp.com/estarossa/browse/git/directives/accessibility/README.md?ref=b-2.0)
2. [Sticky Header](https://devanime.beanstalkapp.com/estarossa/browse/git/directives/sticky-header/README.md?ref=b-2.0)
3. [Toggle](https://devanime.beanstalkapp.com/estarossa/browse/git/directives/toggle/README.md?ref=b-2.0)

### Components
1. [Google Analytics](https://devanime.beanstalkapp.com/estarossa/browse/git/google-analytics/README.md?ref=b-2.0)
2. [Lazy Image](https://devanime.beanstalkapp.com/estarossa/browse/git/lazy-image/README.md?ref=b-2.0)
3. [Media Carousel](https://devanime.beanstalkapp.com/estarossa/browse/git/media-carousel/README.md?ref=b-2.0)
4. [Modal](https://devanime.beanstalkapp.com/estarossa/browse/git/modal/README.md?ref=b-2.0)
5. [Navigation Menu](https://devanime.beanstalkapp.com/estarossa/browse/git/nav-menu/README.md?ref=b-2.0)
6. [Sub Navigation](https://devanime.beanstalkapp.com/estarossa/browse/git/sub-nav/README.md?ref=b-2.0)
7. [Tag Manager](https://devanime.beanstalkapp.com/estarossa/browse/git/tag-manager/README.md?ref=b-2.0)

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
