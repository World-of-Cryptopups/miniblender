#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

struct BlendSchemaIngredient {
    name schema;
};

struct BlendTemplateIngredient {
    name schema;
    uint64_t templateId;
};

struct BlendAttribIngredient {
    name schema;
    string key;
    string value;
};

typedef std::variant<BlendSchemaIngredient, BlendTemplateIngredient, BlendAttribIngredient> BlendIngredientProps;

struct BlendIngredient {
    uint8_t type;
    name collection;
    BlendIngredientProps data;
};

struct BlendTarget {
    name collection;
    uint64_t templateId;
    uint64_t chance;
};

struct BlendConfig {
    uint64_t limit;
    uint64_t userlimit;

    /* TODO: to be implemented in the future */
    // uint64_t startdate;
    // uint64_t enddate;
};
