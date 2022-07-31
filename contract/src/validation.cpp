#include <miniblenderx.hpp>

void miniblenderx::validate_blendconfig(BlendConfig blend_config) {
    // check blend limit
    check(blend_config.limit < -1 || blend_config.limit == 0, "Blend limit should only be -1 or greater than 0.");

    // check user blend limit
    check(blend_config.userlimit < -1 || blend_config.userlimit == 0, "User blend limit should only be -1 or greater than 0.");
}

void miniblenderx::validate_targets(name collection, vector<BlendTarget> targets) {
    auto itrCol = atomicassets::collections.require_find(collection.value, "The collection does not exist!");

    // TODO: check targets in here
}