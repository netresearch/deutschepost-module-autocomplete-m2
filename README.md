# Deutsche Post Direkt Datafactory Autocomplete for Magento 2

The module Datafactory Autocomplete provides automated completion of billing
and shipping addresses in Germany for the customer in the shop frontend.

## Requirements

* PHP >= 7.2

## Compatibility

* Magento >= 2.3.0

## Installation Instructions

Install sources:

    composer require deutschepost/module-autocomplete-m2

Enable module:

    ./bin/magento module:enable PostDirekt_Autocomplete
    ./bin/magento setup:upgrade

Flush cache and compile:

    ./bin/magento cache:flush
    ./bin/magento setup:di:compile

## Uninstallation

To unregister the carrier module from the application, run the following command:

    ./bin/magento module:uninstall --remove-data PostDirekt_Autocomplete
    composer update

This will automatically remove source files, clean up the database, update package dependencies.

## Support

In case of questions or problems, please have a look at the
[Support Portal (FAQ)](https://postdirekt.support.netresearch.de/) first.

If the issue cannot be resolved, you can contact the support team via the
[Support Portal](https://postdirekt.support.netresearch.de/) or by sending an email
to <postdirekt.support@netresearch.de>.

## License

[OSL - Open Software Licence 3.0](http://opensource.org/licenses/osl-3.0.php)

## Copyright

(c) 2023 Deutsche Post AG
