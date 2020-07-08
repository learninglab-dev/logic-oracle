import knightAnswers from './knight.js'
import knaveAnswers from './knave.js'


export default function dragonAnswers(identities, answerer, question, qParams) {
  const knightPresent = Object.values(identities).find(id => id === 'K')
  if (knightPresent) {
    return knaveAnswers(identities, answerer, question, qParams)
  }
  return knightAnswers(identities, answerer, question, qParams)
}
