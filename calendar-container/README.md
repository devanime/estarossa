# Calendar Container #
A standardized front end calendar container with the option to display a sidebar of content.

### Installation ###
1. Install and activate the Set Design plugin via composer.
2. Add the component library as a bower dependency.
3. Configure `Calendar > Calendar Options` in the backend to set up optional sidebar content.
4. Set up variable overrides in variables.scss.

### Usage ###
If using the `Calendar > Calendar Options` to populate the sidebar content. The data comes abstracted via the `CalendarLayout` class.
```php
$CalendarLayout = new CalendarLayout();
echo $CalendarLayout->getHeadline();
echo $CalendarLayout->getTicketingTips();
echo $CalendarLayout->getAdditionalTips();
```

There are two entry points into the view class (aside from the default constructor):
```php
$config = [
    'headline'        => '',
    'ticketing_tips'  => [],
    'additional_tips' => []
];
CalendarContainer::create($config, $class_modifiers = [], $element_attributes = []);
CalendarContainer::createFromCalendarLayout($CalendarLayout);
```

### Authors ###
DevAnime <devanimecards@gmail.com>
