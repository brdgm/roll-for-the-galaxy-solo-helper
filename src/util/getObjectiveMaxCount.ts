import ObjectiveDifficultyLevel from "@/services/enum/ObjectiveDifficultyLevel";

/**
 * Max count of objectives per difficulty level.
 * @param objectiveDifficultyLevel Difficulty Level
 * @returns Max. number of objectives that can be gained
 */
export default function (objectiveDifficultyLevel : ObjectiveDifficultyLevel) : number {
  switch (objectiveDifficultyLevel) {
    case ObjectiveDifficultyLevel.NORMAL_D10:
      return 2
    case ObjectiveDifficultyLevel.HARD_D8:
      return 3
    case ObjectiveDifficultyLevel.INSANE_D6:
      return 4
    default:
      throw new Error(`Unexpected difficulty level: ${ObjectiveDifficultyLevel}`)
  }
}
