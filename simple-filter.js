/**
 * simple-filter.js
 * @version: v0.0.1
 * @author: Guilherme Sousa
 *
 * Created by Guilherme Sousa on 2019-08-08. Please report any bug at email gsousadev@gmail.com
 *
 * Copyright (c) 2019 Guilherme Sousa
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

(function ($) {
    $.fn.simpleFilter = function (options) {

        var defaults = {
            'filterButton': 'sf-filter-button',
            'filterOptions': 'sf-option',
            'searchInput': 'sf-input',
            'searchButton': 'sf-search-button',
            'baseUrl': '/',
        };

        var settings = $.extend({}, defaults, options);

        var filterButton = this.find("." + settings.filterButton);
        var filterOptions = this.find("." + settings.filterOptions);
        var searchInput = this.find("." + settings.searchInput);
        var searchButton = this.find("." + settings.searchButton);

        /* Functions */
        function selectFilter(element) {
            console.log(element.data("filter-type"));
            filterButton.data("filter-type", element.data("filter-type"));
            filterButton.attr("data-filter-type", element.data("filter-type"));
            filterButton.html(element.html());
            searchInput.attr('placeholder', element.data('placeholder'));
        }

        function filter() {
            var baseUrl = settings.baseUrl;
            var url;
            if (searchInput.val() == "") {
                $(location).attr('href', baseUrl);
            } else {
                url = baseUrl + "?filterType=" + filterButton.data("filter-type") + "&filterContent=" + searchInput.val();
                $(location).attr('href', url);
            }
        }

        /* Events */
        filterOptions.on("click", function () {
            selectFilter($(this));
        });

        searchInput.on("keyup", function (e) {
            if (e.keyCode == 13) {
                searchButton.click();
            }
        });

        searchButton.on("click", function () {
            filter();
        });
    };
})(jQuery);
