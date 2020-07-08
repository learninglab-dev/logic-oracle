
export default function knightAnswers(identities, answerer, question, qParams) {
  if (!qParams) {
    switch (question) {
      case 'Same':
      case 'Different':
        qParams = 'all'
        break
      default:
        qParams = [answerer]
        break
    }
  }
  switch (question) {
    case 'Knight':
      return identities[qParams[0]] === 'K' ? true : false
    case 'Knave':
      return identities[qParams[0]] === 'N' ? true : false
    case 'Dragon':
      return identities[qParams[0]] === 'D' ? true : false
    case 'Monk':
      return identities[qParams[0]] === 'M' ? true : false
    case 'Same':
    case 'Different':
      if (qParams[0] === 'all') {
        const characters = Object.keys(identities)
        const roles = new Set(Object.values(identities))
        const allDiff = characters.length === roles.size
        const mismatch = characters.find((char, i) => identities[char] !== identities[characters[0]])
        if (question === 'Same') {
          return mismatch ? false : true
        }
        return allDiff
      }
      const roles = new Set(qParams.map(id => identities[id]))
      const match = qParams.length === roles.size ? false : true
      if (question === 'Same') {
        return match
      }
      return !match
    default:
      return "something went wrong and I don't have an answer"
  }
}
