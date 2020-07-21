import applyPredicates from './predicates.js'
import {
  conjunction,
  disjunction,
  conditional,
  biconditional,
  applyConnectives
} from './connectives'


export default function getTruthValue(identities, answerer, questions) {
  if (Array.isArray(questions)) {
    return applyPredicates(identities, answerer, questions)
  }
  for (const q in questions) {
    if (q !== 'c' && !(Array.isArray(questions[q]))) {
      const qs = Object.keys(questions).filter(key =>  key !== 'c')
      const nestedTVals = qs.map(q => {
        return getNestedTruthValues(identities, answerer, questions[q])
      })
      const subConnectives = nestedTVals.map(q => {
        if (q.c) {
          return applyConnectives(q)
        }
        return q
      })
      console.log('sub')
      console.log(subConnectives)
      const mainConnective = {
        1: subConnectives[0],
        2: subConnectives[1],
        c: questions.c
      }
      return applyConnectives(mainConnective)
    }
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

function getNestedTruthValues(identities, answerer, questions) {
  if (Array.isArray(questions)) {
    return applyPredicates(identities, answerer, questions)
  }
  const qs = Object.keys(questions).filter(key => key !== 'c')
  qs.forEach(q => {
    questions[q] = getNestedTruthValues(identities, answerer, questions[q])
    if (questions[q].c) {
      questions[q] = applyConnectives(questions[q])
    }
  })
  return questions
}
