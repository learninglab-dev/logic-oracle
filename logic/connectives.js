import applyPredicates from './predicates.js'


// TODO: allow more than two conjuncts for and/or ??
export function applyConnectives(question) {
  switch (question.c) {
    case 'AND':
      return question[1] && question[2] ? true : false
    case 'OR':
      return question[1] || question[2] ? true : false
    case 'NOT':
      return !question[1] ? true : false
    case 'IF':
      return question[1] && !question[2] ? false : true
    case 'IFF':
      return (question[1] && question[2]) || (!question[1] && !question[2]) ? true : false
    default:
      console.log('invalid connective');
      return
  }
}


// export function conjunction(identities, answerer, questions) {
//   const qs = Object.keys(questions).filter(key => key !== 'c')
//   for (const q of qs) {
//     if (!applyPredicates(identities, answerer, questions[q])) {
//       return false
//     }
//   }
//   return true
// }
// export function disjunction(identities, answerer, questions) {
//   const qs = Object.keys(questions).filter(key => key !== 'c')
//   for (const q of qs) {
//     if (applyPredicates(identities, answerer, questions[q])) {
//       return true
//     }
//   }
//   return false
// }
// export function conditional(identities, answerer, questions) {
//   if (applyPredicates(identities, answerer, questions[1]) && !applyPredicates(identities, answerer, questions[2])) {
//     return false
//   }
//   return true
// }
// export function biconditional(identities, answerer, questions) {
//   if ((applyPredicates(identities, answerer, questions[1]) && applyPredicates(identities, answerer, questions[2])) || (!applyPredicates(identities, answerer, questions[1]) && !applyPredicates(identities, answerer, questions[2]))) {
//     return true
//   }
//   return false
// }
