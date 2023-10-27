import ObjectiveDifficultyLevel from "@/services/enum/ObjectiveDifficultyLevel";

/**
 * Simulates Dx per difficulty level to gain an objective per round.
 * @param objectiveDifficultyLevel Difficulty Level
 * @returns Dice size
 */
export default function (objectiveDifficultyLevel : ObjectiveDifficultyLevel) : number {
  switch (objectiveDifficultyLevel) {
    case ObjectiveDifficultyLevel.NORMAL_D10:
      return 10
    case ObjectiveDifficultyLevel.HARD_D8:
      return 8
    case ObjectiveDifficultyLevel.INSANE_D6:
      return 6
    default:
      throw new Error(`Unexpected difficulty level: ${ObjectiveDifficultyLevel}`)
  }
}
