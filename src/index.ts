import { GameController } from './controllers/game.controller'

export function main() {
  const game = new GameController()
  game.mainInstance.setUp()
}
