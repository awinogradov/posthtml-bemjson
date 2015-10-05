var bemNaming = require('bem-naming');

module.exports = function posthtmlBemjson(tree) {
    tree.match({ attrs: { class: true }}, function(node) {
        var classes = node.attrs.class.split(' ');

        if (bemNaming.validate(classes)) {
            Object.assign(node, namingToBemJson(bemNaming.parse(classes[0])));
        } else {
            var blocks = classes.map(function(cls) {
                if(bemNaming.validate(cls)) {
                    return namingToBemJson(bemNaming.parse(cls));
                }
            });

            Object.assign(node, resolveBlocks(blocks));
        }

        return node;
    });

    return tree;
};

function resolveBlocks(arr) {
    var mixBlock = arr[0],
        origin = arr[0];

    for (var i = 1, len = arr.length; i < len; i++) {
        if (mixBlock.block === arr[i].block) {
            Object.assign(mixBlock, arr[i]);
        } else {
            origin.mix = origin.mix || [];
            origin.mix.push(arr[i]);
            mixBlock = arr[i];
        }
    }

    return origin;
}

function namingToBemJson(naming) {
    var block = { block: naming.block },
        mods = {};

    if (naming.elem) block.elem = naming.elem;
    if (naming.modName) {
        mods[naming.modName] = naming.modVal;
        if (naming.elem) block.elemMods = mods;
        else block.mods = mods;
    }

    return block;
}
