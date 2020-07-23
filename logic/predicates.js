
export default function applyPredicates(identities, answerer, question) {
  let [predicate, params] = question
  //currently setting defaults here; this might not work if this gets broken out further with quantifiers
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
      return Knight(identities, params)
    case 'Knave':
      return Knave(identities, params)
    case 'Dragon':
      return Dragon(identities, params)
    case 'Monk':
      return Monk(identities, params)
    case 'Same':
      return Same(identities, params)
    case 'Different':
      if (params[0] === 'all') {
        return Same(identities, ['none'])
      } else if (params[0] === 'none') {
        return Same(identities, ['all'])
      }
      return !Same(identities, params)
    default:
      return "something went wrong and I don't have an answer"
  }
}

function Knight(identities, params) {
  var roles = new Set(Object.values(identities))
  var count = Object.values(identities).filter(id => id === 'K').length
  switch (params[0]) {
    case 'all':
      return roles.has('K') && roles.size === 1 ? true : false
    case 'some':
      return roles.has('K')
    case 'none':
      return !roles.has('K')
    case 'more':
      return count > params[1] ? true : false
    case 'least':
      return count >= params[1] ? true : false
    case 'less':
      return count < params[1] ? true : false
    case 'most':
      return count <= params[1] ? true : false
    default:
      for (const name of params) {
        if (identities[name] !== 'K') {
          return false
        }
      }
      return true
  }
}
function Knave(identities, params) {
  var roles = new Set(Object.values(identities))
  var count = Object.values(identities).filter(id => id === 'N').length
  switch (params[0]) {
    case 'all':
      return roles.has('N') && roles.size === 1 ? true : false
    case 'some':
      return roles.has('N')
    case 'none':
      return !roles.has('N')
    case 'more':
      return count > params[1] ? true : false
    case 'least':
      return count >= params[1] ? true : false
    case 'less':
      return count < params[1] ? true : false
    case 'most':
      return count <= params[1] ? true : false
    default:
      for (const name of params) {
        if (identities[name] !== 'N') {
          return false
        }
      }
      return true
  }
}
function Dragon(identities, params) {
  var roles = new Set(Object.values(identities))
  var count = Object.values(identities).filter(id => id === 'D').length
  switch (params[0]) {
    case 'all':
      return roles.has('D') && roles.size === 1 ? true : false
    case 'some':
      return roles.has('D')
    case 'none':
      return !roles.has('D')
    case 'more':
      return count > params[1] ? true : false
    case 'least':
      return count >= params[1] ? true : false
    case 'less':
      return count < params[1] ? true : false
    case 'most':
      return count <= params[1] ? true : false
    default:
      for (const name of params) {
        if (identities[name] !== 'D') {
          return false
        }
      }
      return true
  }
}
function Monk(identities, params) {
  var roles = new Set(Object.values(identities))
  var count = Object.values(identities).filter(id => id === 'M').length
  switch (params[0]) {
    case 'all':
      return roles.has('M') && roles.size === 1 ? true : false
    case 'some':
      return roles.has('M')
    case 'none':
      return !roles.has('M')
    case 'more':
      return count > params[1] ? true : false
    case 'least':
      return count >= params[1] ? true : false
    case 'less':
      return count < params[1] ? true : false
    case 'most':
      return count <= params[1] ? true : false
    default:
      for (const name of params) {
        if (identities[name] !== 'M') {
          return false
        }
      }
      return true
  }
}
function Same(identities, params){
  var roles = new Set(Object.values(identities))
  var characters = new Set(Object.keys(identities))
  var counts = {
    K: Object.values(identities).filter(id => id === 'K').length,
    N: Object.values(identities).filter(id => id === 'N').length,
    D: Object.values(identities).filter(id => id === 'D').length,
    M: Object.values(identities).filter(id => id === 'M').length
  }
  var matches = Object.values(counts)
    .filter(count => count > 1)
    .reduce((x, y) => x+y, 0)
  switch (params[0]) {
    case 'all':
      return roles.size === 1 ? true : false
    case 'some':
      return roles.size === characters.size ? false : true
    case 'none':
      return roles.size === characters.size ? true : false
    case 'least':
      return matches >= params[1] ? true : false
    default:
      const selected = new Set(params.map(id => identities[id]))
      return selected.size === 1 ? true : false
  }
}
