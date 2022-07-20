# Accessibility
This directive encapsulates most of a projects accessibility needs. Below is a list of all of the different types of disabilities that are addressed in this directive:
* Visual
* Cognitive, learning, and neurological
* Auditory
* Physical
* Speech

## Skip Nav Button
Adding the data attribute `data-skip-nav` will prepend a skip nav button to any element.

```html
<header data-skip-nav>
``` 

Default button text is "Skip to Content". It can be overridden by 
setting a value on the `data-skip-nav` attribute:

```html
<header data-skip-nav="Skip Navigation">
```

On click, focus will be set to the next container. To manually specify 
a target instead, add the `data-skip-nav-target` attribute:

```html
<footer data-skip-nav="Back to Top" data-skip-nav-target=".header-top">
```

#### Styling
Default button style will use `currentColor` for the border and text, 
and `$primary` for the background. Any further styling can be 
applied in the theme.

## Focus States + Tabbing
There are two body classes, `.accessibility-on` and `.accessibility-off`, 
which are toggled based on the user's interactions. If the "Tab" key is 
pressed, `.accessibility-on` is toggled on. If a click event follows at 
any point, `.accessibility-off` is toggled on (and `.accessibility-on` 
removed). Initial value is `.accessibility-off`. The default focus state 
for `.accessibility-off` is:

```scss
.accessibility-off {
    *:focus {
        outline: none;
    }
}
```

Default for `.accessibility-on` is:

```scss
$accessibility-focus-outline: 1px dotted currentColor !default;
$accessibility-focus-outline-offset: 3px !default;
.accessibility-on {
    *:focus {
        outline: $accessibility-focus-outline;
        outline-offset: $accessibility-focus-outline-offset;
    }
}
```

These styles can be overridden by setting the above scss variables in 
the theme. 

## Buttonify
Adding the `data-button` attribute will make any non-interactive element 
(anything not **a** or **button**) to behave like a button by adding 
`role="button"` and `tabindex="0"` attributes, as well as adding keyboard 
event listeners for the space and enter keys.

```html
 <span class="btn" data-button>Click Me</span>
```

If a value is set for `data-button`, that value will used as the 
`aria-label`. 

```html
 <span class="btn" data-button="Learn More about the Spanish Inquisition">Read More</span>
```
