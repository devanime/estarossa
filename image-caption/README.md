# Image Caption #
A standardized front end component to display an image with a caption. 

### Installation ###
Install and activate the Set Design plugin via composer.

### Usage ###
There are two entry points (aside from the default constructor):
```php
ImageCaptionView::create($image_id, $caption, $class_modifiers, $element_attributes);
ImageCaptionView::createFromImage($image_id, $class_modifiers, $element_attributes);
```

### Notes ###
There is a static method on the view class to control the width, it can be used as such:
```php
$View = ImageCaptionView::createFromImage('717');
$View->setWidth(400);
echo $View;
```

### Authors ###
DevAnime <devanimecards@gmail.com>
