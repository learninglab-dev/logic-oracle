import applyPredicates from './predicates.js'
import { applyConnectives } from './connectives'


export default function getTruthValue(identities, answerer, questions) {
  const nestedTVals = getNestedTruthValues(identities, answerer, questions)
  return nestedTVals.c ? applyConnectives(nestedTVals) : nestedTVals
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
