define(function(require) {
    'use strict';

    var twigjs = require('twigjs'),
        Twig = require('twig');

    xdescribe('compiler', function() {

        it('should add a new compiler module to Twig.js', function() {
            expect(Twig.compiler.module['requirejs-twig']).toBeDefined();
        });

    });

    describe('applyExtension', function() {

        it('should add extension to the name', function() {
            expect(twigjs.applyExtension('foo', 'bar')).toBe('foo.bar');
        });

        it('should not add the extension if the extension is empty or not a string', function() {
            expect(twigjs.applyExtension('foo', '')).toBe('foo');
            expect(twigjs.applyExtension('foo', false)).toBe('foo');
            expect(twigjs.applyExtension('foo', null)).toBe('foo');
            expect(twigjs.applyExtension('foo', {})).toBe('foo');
        });

    });

    describe('load', function() {

        it('should pass a template renderer as argument to onLoad callback', function(done) {
            function onLoad(template) {
                expect(typeof template).toBe('function');
                expect(template({ value: 'foo' })).toEqual('foo');
                done();
            }

            twigjs.load('test/templates/simple', require, onLoad);
        });

        it('should call onLoad.error if template does not exist', function(done) {
            twigjs.load('foo/bar/baz', require, {
                error: function() {
                    done();
                }
            });
        });

    });

    describe('write', function() {

        it('should use template compiler', function() {
            var write = jasmine.createSpyObj('write', ['asModule']),
                template = Twig.twig({ id: 'raw_template', data: '{{ value }}' });

            template.compile = function() {
                return 'compiled_template';
            };
            twigjs.write('twigjs', 'raw_template', write);

            expect(write.asModule).toHaveBeenCalledWith('twigjs!raw_template', 'compiled_template');
        });

    });

});
