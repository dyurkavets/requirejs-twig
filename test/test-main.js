(function(karma) {

    var TEST_REGEXP = /(spec|test)\.js$/i;

    function normalizeModulePath(path) {
        return path.replace(/^\/base\//, '').replace(/\.js$/, '');
    }

    function getTestFiles() {
        var files = [];

        Object.keys(karma.files).forEach(function(file) {
            if (TEST_REGEXP.test(file)) {
                files.push(normalizeModulePath(file));
            }
        });

        return files;
    }

    require.config({

        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: '/base',

        paths: {
            twig: 'bower_components/twig.js/twig'
        },

        // dynamically load all test files
        deps: getTestFiles(),

        // we have to kickoff jasmine, as it is asynchronous
        callback: karma.start

    });

}(window.__karma__));
