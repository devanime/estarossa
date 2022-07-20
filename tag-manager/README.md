# Tag Manager
Google Tag Manager is a free tag management solution provided by Google. Deploy and manage various marketing and analytics tags on a website or mobile app.
This component handles the implementation of Google Tag Manager itself on a particular project, alongside its associated events and interactions.
The data received gets pushed to the **DataLayer**, which then pushes the data to a third party service, such as Google Analytics.

## Understanding the different GTM components
**Tag**: A tag is a bunch of JavaScript code which is used to collect measurement and marketing data from your website/mobile app and then send that data to 3rd party services.
The tag name should be the full encapsulation of a particular component. For example, `Footer Events`, `Engagement Card Events`, `Calendar Events`, etc.

**Container Tag** : The Google Tag Manager container tag is made of of two parts:
* The first part is placed in the head section of all web pages on your website:
```php
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXAAA');</script>
<!-- End Google Tag Manager -->
```
* The second part is placed immediately after the opening `<body>` tag of all web pages on your website:
```php
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXAAA"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**Container ID**: The part of the GTM container tag which reads `GTM-TXAAA`. This ID is used to uniquely identify each GTM container tag.

**Trigger**: A condition which must be met during run time for a tag to fire or not fire. There are two types of triggers:
* **Firing Triggers**: A firing trigger tells GTM when the tag should fire. There are two types of firing triggers:
    * **Built-in firing triggers**: Predefined firing triggers (creating/editing a tag).
    * **User-defined firing triggers**: Custom triggers created through the triggers menu.
* **Blocking Triggers**: A blocking trigger tells GTM when the tag should not fire.
    * Created by clicking on the `Add Exception` link while

**Variables**: A function which can be called from within a tag, trigger or another variable. It is used to store data that is used in defining a trigger and/or to pass information to tags(s) at runtime from the DataLayer.
* A variable tells GTM where to fire a tag.
* The value is populated during run time.
* There are two categories of variables:
    * **Built-in variables**: Predefined variables. These variables cannot be customised.
    * **User defined variables**: Custom variables created through the Variables menu.

**Folders**: Through folders you can organize tags, triggers and variables by project name, team name, etc.

**Data Layer**: A data layer is a javascript array of a single object which is used to collect and store data from a website and then send that data to the GTM container tag.
* Window.dataLayer.push(): Through the push method of the DataLayer object, you can dynamically add object(s) to your data layer. The pushed object can container one or more data layer variables.
`dataLayer` is a global Javascript array variable that can thus be accessed by any function that can also access the window object.

## Getting Started
Log into GTM Account, and create a tag. Click on `Tag Configuration` and select the **Google Analytics: Universal Analytics** tag type with the **Event** track type. Set your user-defined variables for **Category**, **Action**, **Label**.
Next, define your set of firing and/or blocking triggers on the tag by determining the trigger type, event name and event rule. Similar event rules can be further filtered using an InteractionContext.

In the code, add a `data-gtm={{tag}}` data attribute to a particular element. For example, if you wish to set up event tracking for a callout component. Put the `data-gtm="callout"` data attribute on the [outermost] containing element of the callout component. 

Repeat these steps until all of your desired tags have been created.

## Testing
To test your work, click on the **Preview** button in the GTM console. This will open up a GTM panel when you reload the desired website. The panel provides a management interface to see and interact with the GTM events that are firing on each page. 

## Authors
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
* **DevAnime** - [devanimecards@gmail.com](devanimecards@gmail.com)
