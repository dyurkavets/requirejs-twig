define(function() {
    'use strict';

    function getRequire(config) {
        var context = requirejs.config({
                baseUrl: '/base',
                paths: {
                    twig: 'bower_components/twig.js/twig'
                },
                config: {
                    twigjs: config
                },
                context: 'test' + Date.now()
            });

        return function() {
            return context.apply(this, arguments);
        };
    }

    function assertLoaded(loaded, done) {
        expect(loaded).toBeTruthy();
        done();
    }

    describe('config.autoescape', function() {

        it('should turn on autoescape by default', function(done) {
            var testRequire = getRequire();

            testRequire(['twigjs!test/templates/simple'], function(template) {
                expect(template({ value: '<test>&</test>' })).toEqual('&lt;test&gt;&amp;&lt;/test&gt;');
                done();
            }, function() {
                assertLoaded(false, done);
            });
        });

        it('should turn on autoescape if true', function(done) {
            var testRequire = getRequire();

            testRequire(['twigjs!test/templates/simple'], function(template) {
                expect(template({ value: '<test>&</test>' })).toEqual('&lt;test&gt;&amp;&lt;/test&gt;');
                done();
            }, function() {
                assertLoaded(false, done);
            });
        });

        it('should turn off autoescape if false', function(done) {
            var testRequire = getRequire({ autoescape: false });

            testRequire(['twigjs!test/templates/simple'], function(template) {
                expect(template({ value: '<test>&</test>' })).toEqual('<test>&</test>');
                done();
            }, function() {
                assertLoaded(false, done);
            });
        });

    });

    describe('config.extension', function() {

        it('should load the template with "twig" extension by default', function(done) {
            var testRequire = getRequire();

            testRequire(['twigjs!test/templates/simple'], function() {
                assertLoaded(true, done);
            }, function() {
                assertLoaded(false, done);
            });
        });

        it('should load the template with configured extension', function(done) {
            var testRequire = getRequire({ extension: 'html' });

            testRequire(['twigjs!test/templates/simple'], function() {
                assertLoaded(true, done);
            }, function() {
                assertLoaded(false, done);
            });
        });

        it('should load the template if extension is empty, null or false', function(done) {
            var testRequire = getRequire({ extension: '' });

            testRequire(['twigjs!test/templates/simple.html'], function() {
                assertLoaded(true, done);
            }, function() {
                assertLoaded(false, done);
            });
        });

    });

});
