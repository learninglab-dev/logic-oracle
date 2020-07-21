import applyPredicates from './predicates.js'
import {
  conjunction,
  disjunction,
  conditional,
  biconditional
} from './connectives'


export default function getTruthValue(identities, answerer, questions) {
  if (Array.isArray(questions)) {
    return applyPredicates(identities, answerer, questions)
  }
  switch (questions.c) {
    case 'NOT':
      return !applyPredicates(identities, answerer, questions[1])
    case 'AND':
      return conjunction(identities, answerer, questions)
    case 'OR':
      return disjunction(identities, answerer, questions)
    case 'IF':
      return conditional(identities, answerer, questions)
    case 'IFF':
      return biconditional(identities, answerer, questions)
    default:
      console.log('invalid connective applied')
      console.log('responding with the answer to just your first question')
      console.log('try submitting again if you meant to use "AND", "OR", "IF", etc.')
      return applyPredicates(identities, answerer, questions[1])
  }
}
