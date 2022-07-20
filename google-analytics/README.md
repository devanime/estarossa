# Google Analytics
Google Analytics is a free web analytics tool offered by Google to help analyze website traffic.
This component sets the rules for firing these events. 

## Getting Started
Add the Google Analytics snippet to your projects base.php file. Replacing `UA-XXXXXX-X` and `GTM-XXXXXXX` as needed.

```html
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-XXXXXX-X', 'auto');
        ga('require', 'linker');
        ga('linker:autoLink', ['ticketmaster.com'] );
        ga('require', 'displayfeatures');
        ga('require', 'linkid', 'linkid.js');
        ga('send', 'pageview');
    </script>
```

## Usage
Add the attribute `data-ga-event` with the appropriate string, **{Category}, {Action}, {Label}**.
The javascript will publish an event to Google Analytics

```html
<a href="#" data-ga-event="Category, Action, Label"></a>
```

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
