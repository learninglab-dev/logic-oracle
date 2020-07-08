
export default function knaveAnswers(identities, answerer, question, qParams) {
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
      return identities[qParams[0]] === 'K' ? false : true
    case 'Knave':
      return identities[qParams[0]] === 'N' ? false : true
    case 'Dragon':
      return identities[qParams[0]] === 'D' ? false : true
    case 'Monk':
      return identities[qParams[0]] === 'M' ? false : true
    case 'Same':
    case 'Different':
      if (qParams[0] === 'all') {
        const characters = Object.keys(identities)
        const roles = new Set(Object.values(identities))
        const allDiff = characters.length === roles.size
        const mismatch = characters.find((char, i) => identities[char] !== identities[characters[0]])
        if (question === 'Same') {
          return mismatch ? true : false
        }
        return !allDiff
      }
      const roles = new Set(qParams.map(id => identities[id]))
      const match = qParams.length === roles.size ? false : true
      if (question === 'Same') {
        return !match
      }
      return match
    default:
      return "something went wrong and I don't have an answer"
  }
}
