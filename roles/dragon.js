import knightAnswers from './knight.js'
import knaveAnswers from './knave.js'


export default function dragonAnswers(identities, question, qParams) {
  const knightPresent = Object.values(identities).find(id => id === 'K')
  if (knightPresent) {
    if (question === 'Dragon') {
      return false
    }
    if (question === 'Knave') {
      return true
    }
    return knaveAnswers(identities, question, qParams)
  }
  if (question === 'Dragon') {
    return true
  }
  if (question === 'Knight') {
    return false
  }
  return knightAnswers(identities, question, qParams)
}
