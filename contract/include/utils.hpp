#include <eosio/system.hpp>

using namespace eosio;

namespace utils {

// get current time in in seconds
uint32_t now() {
    return current_time_point().sec_since_epoch();
}

}  // namespace utils