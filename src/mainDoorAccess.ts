import { engine, type Entity, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import { type Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'
import { type Dialog } from 'dcl-npc-toolkit'
import * as utils from '@dcl-sdk/utils'

// Defining a Security Guard at Club Entrance.................

export class NPC {
  entity: Entity = engine.addEntity()
  constructor(
    position: Vector3,
    scale: Vector3,
    rotation: Quaternion,
    GLTF: string,
    reactDistance: number,
    onActivate: () => void = () => {},
    onClick: () => void = () => {}
  ) {
    this.entity = npc.create(
      {
        position,
        scale,
        rotation
      },
      {
        type: npc.NPCType.CUSTOM,
        model: GLTF,
        faceUser: true,
        onActivate: () => {},
        onWalkAway: () => {}
      }
    )
    utils.triggers.addTrigger(
      this.entity,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(reactDistance, 2, reactDistance) }],
      () => {
        onActivate()
      }
    )
    pointerEventsSystem.onPointerDown(
      {
        entity: this.entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Talk'
        }
      },
      () => {
        onClick()
      }
    )
  }
}

// Guard's Conversations with the Player/User/Customer.......
export const guardCheckPoint: Dialog[] = [
  {
    text: 'Hey You! <b>CatHouse</b> is not for anyone under the age of 18......',
    isEndOfDialog: true
  },
  {
    text: '<b>Welcome To CatHouse</b>',
    isEndOfDialog: true,
    name: 'welcome'
  },
  {
    text: 'Sorry Restricted Area for Under 18',
    isEndOfDialog: true,
    name: 'under 18'
  },
  {
    text: 'Thanks For Visiting Us. See You Soon!',
    isEndOfDialog: true,
    name: 'goodbye'
  },
  {
    text: 'Mana Pay Required',
    isEndOfDialog: true,
    name: 'mana'
  }
]
