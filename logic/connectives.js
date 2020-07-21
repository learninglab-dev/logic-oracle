import applyPredicates from './predicates.js'


export function conjunction(identities, answerer, questions) {
  const qs = Object.keys(questions).filter(key => key !== 'c')
  for (const q of qs) {
    if (!applyPredicates(identities, answerer, q)) {
      return false
    }
  }
  return true
}
export function disjunction(identities, questions) {
  const qs = Object.keys(questions).filter(key => key !== 'c')
  for (const q of qs) {
    if (applyPredicates(identities, answerer, q)) {
      return true
    }
  }
  return false
}
export function conditional(identities, questions) {
  if (applyPredicates(identities, answerer, questions[1]) && !applyPredicates(identities, answerer, questions[2])) {
    return false
  }
  return true
}
export function biconditional(identities, questions) {
  if ((applyPredicates(identities, answerer, questions[1]) && applyPredicates(identities, answerer, questions[2])) || (!applyPredicates(identities, answerer, questions[1]) && !applyPredicates(identities, answerer, questions[2]))) {
    return true
  }
  return false
}
