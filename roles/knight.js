
export default function knightAnswers(identities, question, qParams) {
  switch (question) {
    case 'Knight':
      return true
    case 'Knave':
      return false
    case 'Dragon':
      return false
    case 'Monk':
      return false
    case 'Same':
      if (qParams[0] === 'all') {
        const characters = Object.keys(identities)
        const mismatch = characters.find((char, i) => identities[char] !== identities[characters[0]])
        if (mismatch) {
          return false
        }
        return true
      }
    default:
      return "something went wrong and I don't have an answer"
  }
}
