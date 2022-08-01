#pragma once

#include <atomicassets.hpp>
#include <custom-types.hpp>
#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <utils.hpp>

using namespace std;
using namespace eosio;

#define ATOMICASSETS name("atomicassets")

CONTRACT miniblenderx : public contract {
   public:
    using contract::contract;

    ACTION init();

    ACTION createblend(name author, name collection, vector<BlendIngredient> ingredients, vector<BlendTarget> targets, BlendConfig blend_config);
    ACTION callblend();

   private:
    TABLE config_s {
        uint64_t blendcounter = 11111111;
    };

    TABLE blends_s {
        uint64_t id;
        name author;
        name collection;
        vector<BlendIngredient> ingredients;
        vector<BlendTarget> targets;
        BlendConfig blend_config;

        uint64_t primary_key() const { return id; };
    };

    TABLE userlimits_s {
        name user;
        uint64_t current_limit;  // -1 = unlimited, cannot be 0 or less than -1

        uint64_t primary_key() const { return user.value; };
    };

    TABLE blendlimits_s {
        uint64_t id;
        uint64_t current_limit;  // -1 = unlimited, cannot be 0 or less than -1

        uint64_t primary_key() const { return id; };
    };

    typedef singleton<"config"_n, config_s> config_t;
    typedef multi_index<"config"_n, config_s> config_t_for_abi;
    typedef multi_index<"blends"_n, blends_s> blends_t;
    typedef multi_index<"userlimits"_n, userlimits_s> userlimits_t;
    typedef multi_index<"blendlimits"_n, blendlimits_s> blendlimits_t;

    config_t config = config_t(_self, _self.value);

    blends_t get_blends(name collection) {
        return blends_t(_self, collection.value);
    }

    userlimits_t get_userlimits(uint64_t blendid) {
        return userlimits_t(_self, blendid);
    }

    blendlimits_t get_blendlimits(name collection) {
        return blendlimits_t(_self, collection.value);
    }

    /**
     * Validate the configuration of a blend.
     */
    void validate_blendconfig(BlendConfig blend_config);

    /**
     * Validate blend ingredients.
     */
    void validate_ingredients(name collection, vector<BlendIngredient> ingredients);

    /**
     * Validate target blends.
     */
    void validate_targets(name collection, vector<BlendTarget> targets);

    /**
     * Check if user is authorized to mint NFTs
     */
    bool isAuthorized(name collection, name user) {
        auto itr = atomicassets::collections.require_find(collection.value, "No collection with this name exists!");
        bool authorized = false;
        vector<name> accs = itr->authorized_accounts;
        for (auto it = accs.begin(); it != accs.end() && !authorized; it++) {
            if (user == name(*it)) {
                authorized = true;
            }
        }
        return authorized;
    }
};