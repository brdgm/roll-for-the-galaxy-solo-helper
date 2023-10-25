import Phase from "@/services/enum/Phase";
import { Round } from "@/store/state";

/**
 * Get actual selected phase for given round in correct order.
 * @param roundData Round data
 * @returns Selected phases
 */
export default function (roundData : Round) : Phase[] {
  return Object.values(Phase)
    .filter(phase => roundData.playerPhase == phase || roundData.botPhases.includes(phase))
}
