var app;
(function (app) {
    'use strict';
    /**
     * The latest book reviews for a readers
     * <latest-book-reviews reader-model="reader"/>
     */
    function latestBookReviewsDirective(readerApi) {
        // @ngInject
        var link = function (scope) {
            scope.$watch('readerModel', fetchReaderData);
            function fetchReaderData() {
                scope.reader = null;
                scope.reviewData = null;
                if (scope.readerModel) {
                    readerApi
                        .getReaderReviews(scope.readerModel.id)
                        .then(function (data) {
                        console.log(data);
                        scope.reviewData = data;
                    });
                    readerApi
                        .getReaderInfo(scope.readerModel.id)
                        .then(function (data) {
                        console.log(data);
                        scope.reader = data;
                    });
                }
            }
        };
        return {
            restrict: 'EA',
            scope: {
                readerModel: '='
            },
            replace: false,
            templateUrl: '/app/latest-book-reviews.partial.html',
            link: link
        };
    }
    angular
        .module('app')
        .directive('latestBookReviews', latestBookReviewsDirective);
})(app || (app = {}));
