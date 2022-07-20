# Icon #
A standardized front end component to SVG icons. Supports direction and style of the SVG. 

### Installation ###
1. Install and activate the Set Design plugin via composer.
2. Add the component library as a bower dependency.
3. Set up variable overrides in variables.scss.
4. Set up SVGO cli, for proper SVG optimization before use.

```php
svgo [svg-name]
```

### Usage ###
There are two entry points (aside from the default constructor):
```php
IconView::create($name, $style, $direction = '');
IconView::createFromSocialIcon($SocialIcon);
```

### Discrete Examples ###
```php
echo IconView::create('facebook', 'primary');
echo IconView::create('arrow', 'primary', 'up');
``` 

### Notes ###
When using this component, make sure the SVG sprite is being echoed in the header. Look for the following line of code:
```php
echo file_get_contents(get_theme_file_path('dist/images/sprite.svg'));
```

### Authors ###
DevAnime <devanimecards@gmail.com>
