import { engine, InputAction, inputSystem, Material, MeshRenderer, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { movePlayerTo, triggerEmote } from '~system/RestrictedActions'
import { GameController } from './controllers/game.controller'
import * as utils from '@dcl-sdk/utils'

////// DEBUG FLAG - Set to true to view all dance areas
const DEBUG_FLAG = false

///// This system acts on the danceAreas defined above

export class DanceSystem {
  length = 11
  timer = 2
  routine: any
  danceFunction: () => void = () => {
    this.dance()
  }

  routines: string[] = ['robot', 'tik', 'tektonik', 'hammer', 'headexplode', 'handsair', 'disco', 'dab']

  constructor(routine: string) {
    this.routine = routine
  }

  update(dt: number): void {
    if (this.timer > 0) {
      this.timer -= dt
    } else {
      this.dance()
    }
  }

  dance(): void {
    console.log('dance' + this.routine)
    this.timer = this.length
    if (this.routine === 'all') {
      const rand = Math.floor(Math.random() * (this.routine.length - 0) + 0)
      void triggerEmote({ predefinedEmote: this.routines[rand] })
    } else {
      void triggerEmote({ predefinedEmote: this.routine })
    }
  }
}

export class DanceArea {
  danceArea = engine.addEntity()
  danceSystem = new DanceSystem('all')
  gameController: GameController
  danceZone: boolean = false
  constructor(gameController: GameController, position: Vector3, scale: Vector3, rotation: Quaternion) {
    this.gameController = gameController
    Transform.create(this.danceArea, {
      position,
      scale,
      rotation
    })
    MeshRenderer.setBox(this.danceArea)
    Material.setPbrMaterial(this.danceArea, {
      albedoColor: Color4.create(0, 0, 0, 0)
    })
    utils.triggers.addTrigger(
      this.danceArea,
      1,
      1,
      [{ type: 'box', scale }],
      () => {
        this.danceSystem.routine = 'all'
        this.danceSystem.dance()
        this.danceZone = true
      },
      () => {
        this.danceZone = false
      }
    )
  }
}
