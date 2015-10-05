/* jshint mocha: true, maxlen: false */
var posthtmlBemjson = require('..');
var posthtml = require('posthtml');
var expect = require('chai').expect;

function test(input, output) {
    var resultTree = posthtml()
        .use(posthtmlBemjson)
        .process(input, { sync: true, skipParse: true }).tree;
    expect(output[0]).to.eql(resultTree[0]);
}

describe('Test', function() {
    it('block', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block' },
                block: 'block'
            }]
        );
    });

    it('block_mod', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block block_mod' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block block_mod' },
                block: 'block',
                mods: { mod: true }
            }]
        );
    });

    it('block mix', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block other' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block other' },
                block: 'block',
                mix: [{ block: 'other' }]
            }]
        );
    });

    it('block_mod mix', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other' },
                block: 'block',
                mods: { mod: true },
                mix: [{ block: 'other'}]
            }]
        );
    });

    it('block_mod mix_mod', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other other_mod' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other other_mod' },
                block: 'block',
                mods: { mod: true },
                mix: [{ block: 'other', mods: { mod: true }}]
            }]
        );
    });

    it('block_mod mix_mod mix2_mod_val', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other other_mod two two_mod_val' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block block_mod other other_mod two two_mod_val' },
                block: 'block',
                mods: { mod: true },
                mix: [{ block: 'other', mods: { mod: true }}, { block: 'two', mods: { mod: 'val' }}]
            }]
        );
    });

    it('block_mod_val', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block block_mod_val' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block block_mod_val' },
                block: 'block',
                mods: { mod: 'val' }
            }]
        );
    });

    it('block__elem', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block__elem' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block__elem' },
                block: 'block',
                elem: 'elem'
            }]
        );
    });

    it('block__elem_mod_val', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block__elem block__elem_mod_val' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block__elem block__elem_mod_val' },
                block: 'block',
                elem: 'elem',
                elemMods: { mod: 'val' }
            }]
        );
    });

    it('block__elem_mod_val other__elem_mod_val', function() {
        test(
            [{
                tag: 'div',
                attrs: { class: 'block__elem block__elem_mod_val other__elem other__elem_mod_val' }
            }],
            [{
                tag: 'div',
                attrs: { class: 'block__elem block__elem_mod_val other__elem other__elem_mod_val' },
                block: 'block',
                elem: 'elem',
                elemMods: { mod: 'val'},
                mix:[{ block: 'other', elem: 'elem', elemMods: { mod: 'val' }}]
            }]
        );
    });

});
