/**
 * Bot Action
 */
enum Action {
  TAKE_UPGRADE_TILE = 'take-upgrade-tile',
  TAKE_WALL_TILE = 'take-wall-tile',
  CONSTRUCT_BUILDING = 'construct-building',
  INCREASE_PRODUCTION_STONE = 'increase-production-stone',
  INCREASE_PRODUCTION_GOLD = 'increase-production-gold',
  INCREASE_PRODUCTION_GOLD_OR_STONE = 'increase-production-gold-or-stone',
  GAIN_PRODUCTION_TOKEN = 'gain-production-token',
  GAIN_SEAL_GOLD = 'gain-seal-gold',
  GAIN_SEAL_STONE = 'gain-seal-stone'
}
export default Action
