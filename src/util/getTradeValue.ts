import ProduceDiceType from "@/services/enum/ProduceDiceType";

/**
 * Get trade value for product.
 * @param produceDiceType Produce dice type
 * @returns Trade value in $
 */
export default function (produceDiceType : ProduceDiceType) : number {
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
}
