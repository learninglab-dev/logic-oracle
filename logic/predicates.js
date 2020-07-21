
export default function applyPredicates(identities, answerer, questions) {
  let [predicate, params] = questions
  if (!params) {
    switch (predicate) {
      case 'Same':
      case 'Different':
        params = 'all'
        break
      default:
        params = [answerer]
        break
    }
  }
  switch (predicate) {
    case 'Knight':
      return identities[params[0]] === 'K' ? true : false
    case 'Knave':
      return identities[params[0]] === 'N' ? true : false
    case 'Dragon':
      return identities[params[0]] === 'D' ? true : false
    case 'Monk':
      return identities[params[0]] === 'M' ? true : false
    case 'Same':
    case 'Different':
      if (params[0] === 'all') {
        const characters = Object.keys(identities)
        const roles = new Set(Object.values(identities))
        const allDiff = characters.length === roles.size
        const mismatch = characters.find((char, i) => identities[char] !== identities[characters[0]])
        if (predicate === 'Same') {
          return mismatch ? false : true
        }
        return allDiff
      }
      const roles = new Set(params.map(id => identities[id]))
      const match = params.length === roles.size ? false : true
      if (predicate === 'Same') {
        return match
      }
      return !match
    default:
      return "something went wrong and I don't have an answer"
  }
}
