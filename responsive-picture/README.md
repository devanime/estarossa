# Responsive Picture #
A standardized front end component to display a succession of images for each of the different breakpoints.
Breakpoints are defined and passed in as a collection to the component.

### Installation ###
1. Install and activate the Set Design plugin via composer.
2. Add the component library as a bower dependency.
3. Set up variable overrides in variables.scss.

### Usage ###
For the following example, the properties on the PostBase class all return valid WP_Image instances

**Convenience Method**

```php
$SomePostBase = new SomePostBase();
echo ResponsivePictureView::createFromConfig([
    'desktop_image' => $SomePostBase->desktop_image,
    'tablet_image' => $SomePostBase->tablet_image,
    'mobile_image' => $SomePostBase->mobile_image
]);
```

**Default construction:** The Bottom Up Approach (Desktop as base image)
**Note:** This is how the convenience method operates.

```php
$SomePostBase = new SomePostBase();
$SourceCollection = new PictureSourceCollection([
    PictureSource::createFromImage(
        \WP_Image::get_by_attachment_id($SomePostBase->mobile_image_id),
        MediaQuery::createMaximum(ViewportValue::mobile())
    ),
    PictureSource::createFromImage(
        \WP_Image::get_by_attachment_id($SomePostBase->tablet_image_id),
        MediaQuery::createMaximum(ViewportValue::tablet())
    )
]);
new ResponsivePictureView(\WP_Image::get_by_attachment_id($SomePostBase->desktop_image_id), $SourceCollection);
```

### Authors ###
DevAnime <devanimecards@gmail.com>
