#include <miniblenderx.hpp>

#include "validation.cpp"

ACTION miniblenderx::init() {
    require_auth(_self);

    config.get_or_create(_self, config_s{});
}

ACTION miniblenderx::createblend(name author, name collection, vector<BlendIngredient> ingredients, vector<BlendTarget> targets, BlendConfig blend_config) {
    require_auth(author);

    // check if the contract is authorized
    check(isAuthorized(collection, _self), "The contract is not authorized by the collection!");

    // check if authorized author
    check(isAuthorized(collection, author), "Author is not authorized by the collection!");

    // validate the blend config
    validate_blendconfig(blend_config);

    // validate the ingredients
    validate_ingredients(collection, ingredients);

    // validate the targets
    validate_targets(collection, targets);

    auto _blends = get_blends(collection);

    // get blend counter
    auto current_config = config.get();
    uint64_t blenderid = current_config.blendcounter++;
    config.set(current_config, get_self());

    // create blendlimit
    auto _blendlimits = get_blendlimits(collection);
    _blendlimits.emplace(author, [&](blendlimits_s &row) {
        row.current_limit = blend_config.limit;
        row.id = blenderid;
    });

    // create blend
    _blends.emplace(author, [&](blends_s &row) {
        row.id = blenderid;
        row.author = author;
        row.collection = collection;
        row.ingredients = ingredients;
        row.targets = targets;
        row.blend_config = blend_config;
    });
}