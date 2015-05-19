define(function(require) {

    describe('compatibility with Twig.js', function() {

        it('should add a new compiler module', function() {
            expect(Twig.compiler.module.hasOwnProperty('requirejs-twig')).toBe(true);
        });

    });

    describe('template', function() {

        var template = require('twigjs!test/templates/foo');

        it('should be a function', function() {
            expect(typeof template).toBe('function');
        });

        it('should return a rendered template', function() {
            expect(template({ test: true }).trim()).toBe('Foo');
            expect(template().trim()).toBe('Bar');
        });

    });

    describe('plugin parameters', function() {

        it('should be able to configure extension of template files', function(done) {
            requirejs.config({
                twigjs: { extension: 'html' }
            });

            requirejs(['twigjs!test/templates/bar'], function(template) {
                expect(template().trim()).toBe('Lorem ipsum');
                done();
            });
        });

    });

});
