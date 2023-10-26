import Phase from "@/services/enum/Phase";

/**
 * Get alternative phase for bot to try next if current phase is not possible.
 * @param currentPhase Current phase
 * @returns Alternative phase
 */
export default function (currentPhase : Phase) : Phase {
  const phases = Object.values(Phase)
  const index = phases.indexOf(currentPhase)
  if (index == phases.length - 1) {
    return phases[0]
  }
  else {
    return phases[index + 1]
  }
}
