# Content Block #
A standardized front end component to display static content. Supports headline, tagline, content and call to action (link). 

### Installation ###
1. Install and activate the Set Design plugin via composer.
2. Add the component library as a bower dependency.
3. Set up variable overrides in variables.scss.

### Usage ###
When using abstracting data into the Content Block class, there are two static constructors alongside the default:
```php
$ContentBlock = new ContentBlock($headline, $content, $cta = [], $tagline = '');
ContentBlock::create($headline, $content, $cta = []);
ContentBlock::createFromTagline($headline, $tagline, $content = '', $cta = []);
```

There is one entry point for the view class (aside from the default constructor):
```php
ContentBlockView::createFromContentBlock($ContentBlock);
```

### Notes ###
There is built-in modal support on the Call To Action. Pass in a `modal` flag to the $cta array:
```php
$cta['modal'] = true;
ContentBlock::create($headline, $content, $cta); 
```

Whats really happening behind the scenes:
```php
if ($cta && $cta['title']) {
    $class = ['content-block__cta'];
    if ($cta['modal']) {
        $class[] = 'js-modal-trigger';
        unset($cta['modal']);
    }
    $this->link = Util::acfLinkToEl($cta, ['class' => implode(' ', $class)]);
}
```

### Authors ###
DevAnime <devanimecards@gmail.com>
