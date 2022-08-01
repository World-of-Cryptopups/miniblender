#include <miniblenderx.hpp>

void miniblenderx::validate_blendconfig(BlendConfig blend_config) {
    // check blend limit
    check(blend_config.limit < -1 || blend_config.limit == 0, "Blend limit should only be -1 or greater than 0.");

    // check user blend limit
    check(blend_config.userlimit < -1 || blend_config.userlimit == 0, "User blend limit should only be -1 or greater than 0.");
}

void miniblenderx::validate_targets(name collection, vector<BlendTarget> targets) {
    auto templates = atomicassets::get_templates(collection);

    // https://github.com/pinknetworkx/atomicpacks-contract/blob/master/src/pack_creation.cpp#L81-#L96
    uint32_t total_counted_odds = 0;
    uint32_t last_odds = UINT_MAX;

    for (auto t : targets) {
        check(t.odds > 0, "Each outcome must have positive odds");
        check(t.odds <= last_odds,
              "The outcomes must be sorted in descending order based on their odds");
        last_odds = t.odds;

        total_counted_odds += t.odds;
        check(total_counted_odds >= t.odds, "Overflow: Total odds can't be more than 2^32 - 1");

        auto template_itr = templates.require_find(t.template_id,
                                                   ("At least one template id of an outcome does not exist within the collection: " +
                                                    to_string(t.template_id))
                                                       .c_str());
        check(template_itr->max_supply == 0, "Can only use templates without a max supply");
    }
}

void miniblenderx::validate_ingredients(name collection, vector<BlendIngredient> ingredients) {
    for (auto i : ingredients) {
        auto data = i.data;

        switch (data.index()) {
            case 0: {
                /* Schema Ingredient */

                auto props = get<BlendSchemaIngredient>(data);
                auto schemas = atomicassets::get_schemas(collection);
                schemas.require_find(props.schema.value, "Schema does not exist in collection!");

                break;
            }

            case 1: {
                /* Template Ingredient */

                auto props = get<BlendTemplateIngredient>(data);
                auto templates = atomicassets::get_templates(collection);
                templates.require_find(props.template_id, "Template does not exist in collection!");
                auto schemas = atomicassets::get_schemas(collection);

                break;
            }

            case 2: {
                /* Attribute Ingredient */

                auto props = get<BlendAttribIngredient>(data);
                auto schemas = atomicassets::get_schemas(collection);
                auto itr = schemas.require_find(props.schema.value, "Schema does not exist in collection!");

                bool keyExists = false;
                for (auto s : itr->format) {
                    if (s.name == props.key) {
                        keyExists = true;
                    }
                }

                check(keyExists, "Attribute key does not exist in schema!");

                break;
            }

            default:
                check(false, "Invalid ingredient type!");
        }
    }
}