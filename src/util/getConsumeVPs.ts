import DifficultyLevel from "@/services/enum/DifficultyLevel";
import ProduceDiceType from "@/services/enum/ProduceDiceType";

/**
 * Get VPs for consuming product.
 * @param produceDiceType Produce dice type
 * @returns VPs
 */
export default function (produceDiceType : ProduceDiceType, difficultyLevel : DifficultyLevel) : number {
  switch (difficultyLevel) {
    case DifficultyLevel.NORMAL:
      switch (produceDiceType) {
        case ProduceDiceType.NOVELTY:
        case ProduceDiceType.RARE_ELEMENTS:
          return 2
        case ProduceDiceType.GENES:
        case ProduceDiceType.ALIEN:
          return 3
        default:
          throw new Error(`Unexpected dice type: ${produceDiceType}`)
      }
    case DifficultyLevel.ADVANCED:
      switch (produceDiceType) {
        case ProduceDiceType.NOVELTY:
          return 2
        case ProduceDiceType.RARE_ELEMENTS:
          return 3
        case ProduceDiceType.GENES:
          return 4
        case ProduceDiceType.ALIEN:
          return 5
        default:
          throw new Error(`Unexpected dice type: ${produceDiceType}`)
      }
    case DifficultyLevel.EXPERT:
    case DifficultyLevel.PROFESSIONAL:
      switch (produceDiceType) {
        case ProduceDiceType.NOVELTY:
          return 3
        case ProduceDiceType.RARE_ELEMENTS:
          return 4
        case ProduceDiceType.GENES:
          return 5
        case ProduceDiceType.ALIEN:
          return 6
        default:
          throw new Error(`Unexpected dice type: ${produceDiceType}`)
      }
    default:
      throw new Error(`Unexpected difficulty level: ${difficultyLevel}`)
  }
}
