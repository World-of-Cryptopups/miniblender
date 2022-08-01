#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

struct BlendSchemaIngredient {
    name schema;
};

struct BlendTemplateIngredient {
    uint64_t template_id;
};

struct BlendAttribIngredient {
    name schema;
    string key;
    string value;
};

typedef std::variant<BlendSchemaIngredient, BlendTemplateIngredient, BlendAttribIngredient> BlendIngredientProps;

struct BlendIngredient {
    uint8_t type;
    BlendIngredientProps data;
};

struct BlendTarget {
    uint64_t template_id;
    uint64_t odds;
};

struct BlendConfig {
    uint64_t limit;
    uint64_t userlimit;

    /* TODO: to be implemented in the future */
    // uint64_t startdate;
    // uint64_t enddate;
};
