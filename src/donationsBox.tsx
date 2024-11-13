import {
  engine,
  Entity,
  executeTask,
  GltfContainer,
  InputAction,
  MeshCollider,
  pointerEventsSystem,
  QuaternionType,
  Transform,
  UiCanvasInformation,
  Vector3Type
} from '@dcl/sdk/ecs'
import { GameController } from './controllers/game.controller'
import { Input, ReactEcs, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { getUvs, Sprite } from './utils'
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
import { getPlayer } from '@dcl/sdk/src/players'
import * as EthConnect from 'eth-connect'
import { abi } from './abi/abi'
import { payMana } from './mana'

export class DonationsBox {
  entity: Entity
  address: string
  defaultAmount: number
  toDonate: number
  gameController: GameController
  background: Sprite
  background_visible: boolean = false
  acceptButton: Sprite
  cancelButton: Sprite
  donationInput_placeholder: string = ''
  donationInput_value: string = ''
  collider: Entity = engine.addEntity()
  constructor(
    position: Vector3Type,
    scale: Vector3Type,
    rotation: QuaternionType,
    address: string,
    defaultAmount: number,
    gameController: GameController
  ) {
    this.entity = engine.addEntity()
    this.address = address
    this.defaultAmount = defaultAmount
    this.toDonate = defaultAmount
    this.gameController = gameController
    Transform.create(this.entity, {
      position,
      scale,
      rotation
    })
    Transform.create(this.collider,{
      position,
      scale: Vector3.create(0.2,0.2,0.2),
      rotation
    })
    MeshCollider.setBox(this.collider)
    GltfContainer.create(this.entity, { src: 'assets/scene/models/tip.glb' })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Donate'
        }
      },
      () => {
        this.openUI()
      }
    )

    this.background = {
      atlasSrc: 'images/donations_UI.png',
      atlasSize: { x: 1024, y: 512 },
      x: 0,
      y: 0,
      w: 1024,
      h: 424
    }
    this.acceptButton = {
      atlasSrc: 'images/donations_UI.png',
      atlasSize: { x: 1024, y: 512 },
      x: 475,
      y: 425,
      w: 460,
      h: 74
    }

    this.cancelButton = {
      atlasSrc: 'images/donations_UI.png',
      atlasSize: { x: 1024, y: 512 },
      x: 0,
      y: 425,
      w: 460,
      h: 74
    }
  }
  openUI() {
    this.background_visible = true
    this.donationInput_placeholder = this.toDonate.toString()
    this.donationInput_value = this.toDonate.toString()
  }

  closeUI() {
    this.background_visible = false
  }

  makeDonation() {
    console.log('MAKING DONATION OF', this.defaultAmount)
    //TODO: Add mana send function
  }

  createDonationUI(): ReactEcs.JSX.Element {
    const canvasInfo = UiCanvasInformation.get(engine.RootEntity)
    return (
      <UiEntity
        uiTransform={{
          flexDirection: 'row',
          width: canvasInfo.width,
          height: canvasInfo.height,
          justifyContent: 'center',
          positionType: 'relative',
          position: { top: '30%', right: '0%' },
          display: this.background_visible ? 'flex' : 'none'
        }}
      >
        {/* Background */}
        <UiEntity
          uiTransform={{
            positionType: 'relative',
            width: (canvasInfo.height * 2.1) / 2.6,
            height: canvasInfo.height * 0.32
          }}
          uiBackground={{
            textureMode: 'stretch',
            uvs: getUvs(this.background),
            texture: { src: this.background.atlasSrc }
          }}
          onMouseDown={() => {}}
        >
          {/* Input */}
          <Input
            onSubmit={(value) => {
              console.log('on changed value: ', value)
              this.donationInput_value = value
              const moneyText: string = value
              const moneyNumber: number = parseFloat(moneyText)
              this.toDonate = moneyNumber
            }}
            fontSize={25}
            placeholder={this.donationInput_placeholder}
            placeholderColor={Color4.Black()}
            uiTransform={{
              width: canvasInfo.height * 0.1,
              height: canvasInfo.height * 0.06,
              position: { top: '34%', left: '39%' }
            }}
          ></Input>
          {/* accept button*/}
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              width: canvasInfo.height * 0.36,
              height: canvasInfo.height * 0.06,
              position: { bottom: '22%', left: '4%' },
              margin: { left: '0%', right: '0%' }
            }}
            uiBackground={{
              textureMode: 'stretch',
              uvs: getUvs(this.acceptButton),
              texture: { src: this.acceptButton.atlasSrc }
            }}
            onMouseDown={() => {
              this.makeDonation()
              this.closeUI()
            }}
          ></UiEntity>
          {/* cancel button*/}
          <UiEntity
            uiTransform={{
              positionType: 'absolute',
              width: canvasInfo.height * 0.36,
              height: canvasInfo.height * 0.06,
              position: { bottom: '22%', right: '4%' },
              margin: { left: '0%', right: '0%' }
            }}
            uiBackground={{
              textureMode: 'stretch',
              uvs: getUvs(this.cancelButton),
              texture: { src: this.cancelButton.atlasSrc }
            }}
            onMouseDown={() => {
              this.closeUI()
            }}
          ></UiEntity>
        </UiEntity>
      </UiEntity>
    )
  }
}