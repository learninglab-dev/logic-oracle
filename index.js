import knightAnswers from './roles/knight.js'
import knaveAnswers from './roles/knave.js'
import dragonAnswers from './roles/dragon.js'
import monkAnswers from './roles/monk.js'


export default function answerByRole(identities, answerer, question, qParams) {
  switch (identities[answerer]) {
    case 'K':
      return knightAnswers(identities, answerer, question, qParams)
    case 'N':
      return knaveAnswers(identities, answerer, question, qParams)
    case 'D':
      return dragonAnswers(identities, answerer, question, qParams)
    case 'M':
      return monkAnswers(identities, answerer, question, qParams)
    default:
      console.log('invalid answerer identity')
      return
  }
}
