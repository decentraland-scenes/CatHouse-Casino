import {
  engine,
  Transform,
  GltfContainer,
  AudioSource,
  MeshCollider,
  pointerEventsSystem,
  InputAction,
  EasingFunction,
  Tween,
  inputSystem,
  PointerEventType
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import { GameController } from './controllers/game.controller'
import { guardCheckPoint, NPC } from './mainDoorAccess'
import { closeDialogWindow, openDialogWindow } from 'dcl-npc-toolkit'
import * as ui from 'dcl-ui-toolkit'
import { payMana, accessSecondFloor, accessThirdFloor, payMana2 } from './mana'
import { DonationsBox } from './donationsBox'
import { DanceArea } from './dancingFloors'

export class MainInstance {
  gameController: GameController
  //Assets
  private floor_button_1 = 'assets/scene/models/475aa992-b0e2-40ec-8d06-461292435964/1.glb'
  private floor_button_2 = 'assets/scene/models/651dab77-35ec-49ef-8631-6063ec91893f/2.glb'
  private floor_button_3 = 'assets/scene/models/cad17ca0-d83c-4ce1-ab5f-c1d5ead72295/3.glb'
  private floor_button_4 = 'assets/scene/models/d4d7118a-b54d-45d8-992e-6669c8744eaa/4.glb'
  private floor_button_5 = 'assets/scene/models/9b4c38e3-4a65-41db-a209-bce70a5cbf7a/5.glb'
  private floor_button_6 = 'assets/scene/models/98f6cc0d-3e2c-4fc7-8b90-405914d08397/6.glb'
  //entities
  private _scene = engine.addEntity()
  private entity = engine.addEntity()
  private entity2 = engine.addEntity()
  private entity3 = engine.addEntity()
  private music = engine.addEntity()
  private toolbox = engine.addEntity()
  private clickArea = engine.addEntity()
  private imageFromURL = engine.addEntity()
  private imageFromURL2 = engine.addEntity()
  private imageFromURL3 = engine.addEntity()
  private imageFromURL4 = engine.addEntity()
  private imageFromURL5 = engine.addEntity()
  private imageFromURL6 = engine.addEntity()
  private videoStream = engine.addEntity()
  private triggerArea = engine.addEntity()
  private imageFromURL7 = engine.addEntity()
  private imageFromURL8 = engine.addEntity()
  private videoStream2 = engine.addEntity()
  private triggerArea2 = engine.addEntity()
  private triggerArea3 = engine.addEntity()
  private triggerArea4 = engine.addEntity()
  private triggerArea5 = engine.addEntity()
  private videoStream3 = engine.addEntity()
  private triggerArea6 = engine.addEntity()
  private triggerArea7 = engine.addEntity()
  private videoStream4 = engine.addEntity()
  private videoStream5 = engine.addEntity()
  private nftPictureFrame = engine.addEntity()
  private nftPictureFrame2 = engine.addEntity()
  private nftPictureFrame3 = engine.addEntity()
  private nftPictureFrame4 = engine.addEntity()
  private triggerArea8 = engine.addEntity()
  private videoStream6 = engine.addEntity()
  private tofirstfloorbutton = engine.addEntity()
  private tosecondfloorbutton = engine.addEntity()
  private tothirdfloorbutton = engine.addEntity()
  private tofourthfloorbutton = engine.addEntity()
  private tofifthfloorbutton = engine.addEntity()
  private totopfloorbutton = engine.addEntity()
  private tofirstfloorbutton2 = engine.addEntity()
  private tosecondfloorbutton2 = engine.addEntity()
  private tothirdfloorbutton2 = engine.addEntity()
  private tofourthfloorbutton2 = engine.addEntity()
  private tofifthfloorbutton2 = engine.addEntity()
  private totopfloorbutton2 = engine.addEntity()
  private tofirstfloorbutton3 = engine.addEntity()
  private tosecondfloorbutton3 = engine.addEntity()
  private tothirdfloorbutton3 = engine.addEntity()
  private tofourthfloorbutton3 = engine.addEntity()
  private tofifthfloorbutton3 = engine.addEntity()
  private totopfloorbutton3 = engine.addEntity()
  private tofirstfloorbutton4 = engine.addEntity()
  private tosecondfloorbutton4 = engine.addEntity()
  private tothirdfloorbutton4 = engine.addEntity()
  private tofourthfloorbutton4 = engine.addEntity()
  private tofifthfloorbutton4 = engine.addEntity()
  private totopfloorbutton4 = engine.addEntity()
  private tofirstfloorbutton5 = engine.addEntity()
  private tosecondfloorbutton5 = engine.addEntity()
  private tothirdfloorbutton5 = engine.addEntity()
  private tofourthfloorbutton5 = engine.addEntity()
  private tofifthfloorbutton5 = engine.addEntity()
  private totopfloorbutton5 = engine.addEntity()
  private door = engine.addEntity()
  private imageFromURL9 = engine.addEntity()
  private thirdfloor = engine.addEntity()
  private fourthfloor = engine.addEntity()
  private groundfirstfloor = engine.addEntity()
  private secondfloor = engine.addEntity()
  private topfloor = engine.addEntity()
  private invisibleWall = engine.addEntity()
  private invisibleWall2 = engine.addEntity()
  private invisibleWall3 = engine.addEntity()
  private invisibleWall4 = engine.addEntity()
  //Donation Boxes
  tip: DonationsBox
  tip2: DonationsBox
  tip3: DonationsBox
  tip4: DonationsBox
  tip5: DonationsBox
  tip6: DonationsBox
  tip7: DonationsBox
  //Dance Areas
  danceArea_1: DanceArea
  danceArea_2: DanceArea
  danceArea_3: DanceArea
  danceArea_4: DanceArea
  danceArea_5: DanceArea
  danceArea_6: DanceArea
  danceArea_7: DanceArea
  danceArea_8: DanceArea
  //others
  private clubGuard: NPC
  public prompt: ui.FillInPrompt
  constructor(gameController: GameController) {
    this.gameController = gameController
    this.clubGuard = new NPC(
      Vector3.create(6.44, 1.2, 1.72),
      Vector3.create(1, 1, 1),
      Quaternion.create(0, 180, 0, 1),
      'assets/scene/models/alice.glb',
      3,
      () => {
        openDialogWindow(this.clubGuard.entity, guardCheckPoint, 0)
      },
      () => {
        closeDialogWindow(this.clubGuard.entity)
      }
    )
    this.prompt = ui.createComponent(ui.FillInPrompt, {
      title: "I'm going to need to see some ID",
      placeholder: 'Enter your Birth Year',
      onAccept: (e: string) => {
        let submittedText: number = +e
        if (submittedText <= 2002) {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'welcome')
          this.prompt.hide()
          Tween.create(this.door, {
            mode: Tween.Mode.Move({
              start: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5),
              end: Vector3.create(8.065906524658203, 7, 3.5)
            }),
            duration: 1500,
            easingFunction: EasingFunction.EF_LINEAR,
          })
          AudioSource.getMutable(this.music).playing = true
          AudioSource.getMutable(this.music).volume = 1
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'under 18')
          this.prompt.hide()
        }
      }
    })
    //Tip on 2nd Dance Floor Poles//////////////////////////
    this.tip = new DonationsBox(
      Vector3.create(7.55, 12, 32.9),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip2 = new DonationsBox(
      Vector3.create(7.55,12,24.7),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip3 = new DonationsBox(
      Vector3.create(7.55,12,16.6),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip4= new DonationsBox(
      Vector3.create(13.98,11.78,8),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip5 = new DonationsBox(
      Vector3.create(2.25,11.78,8),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip6 = new DonationsBox(
      Vector3.create(14.68,19.03,10),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    this.tip7 = new DonationsBox(
      Vector3.create(1.16,19.03,10),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x73f6D4eda98DA27CAF1FC32792109eF8e3A51a1f',
      10,
      this.gameController
    )
    //Dance Areas
    this.danceArea_1 = new DanceArea(this.gameController,
      Vector3.create(7.91103458404541, 0.09260523319244385, 40.509727478027344),
      Vector3.create(10.423848152160645, 1, 8.243631362915039),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_2 = new DanceArea(this.gameController,
      Vector3.create(8.170372009277344, 10.481361389160156, 41.3394889831543),
      Vector3.create(3.9054834842681885, 0.2, 3.448207139968872),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_3 = new DanceArea(this.gameController,
      Vector3.create(7.667209625244141, 10.88877010345459, 24.533428192138672),
      Vector3.create(6.003643989562988, 0.2, 22.413347244262695),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_4 = new DanceArea(this.gameController,
      Vector3.create(14.10114860534668, 10.724449157714844, 10.337156295776367),
      Vector3.create(2.710418701171875, 0.5, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_5 = new DanceArea(this.gameController,
      Vector3.create(2.0071144104003906, 10.71868896484375, 10.337156295776367),
      Vector3.create(2.710418701171875, 0.6, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_6 = new DanceArea(this.gameController,
      Vector3.create(14.041966438293457, 17.887067794799805, 12.153299331665039),
      Vector3.create(2.710418701171875, 0.7, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_7 = new DanceArea(this.gameController,
      Vector3.create(1.8554704189300537, 17.887069702148438, 12.181068420410156),
      Vector3.create(2.710418701171875, 0.7, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1),
    )
    this.danceArea_8 = new DanceArea(this.gameController,
      Vector3.create(8.063483238220215, 29, 34.007625579833984),
      Vector3.create(5.48532772064209, 0.2, 8.243631362915039),
      Quaternion.create(0, 0, 0, 1),
    )
    engine.addSystem(() => {
      console.log(this.danceArea_1.danceZone)
      const cmd = inputSystem.getInputCommand(
        InputAction.IA_FORWARD,
        PointerEventType.PET_DOWN,
      )
      const cmd2 = inputSystem.getInputCommand(
        InputAction.IA_BACKWARD,
        PointerEventType.PET_DOWN,
      )
      const cmd3 = inputSystem.getInputCommand(
        InputAction.IA_LEFT,
        PointerEventType.PET_DOWN,
      )
      const cmd4 = inputSystem.getInputCommand(
        InputAction.IA_RIGHT,
        PointerEventType.PET_DOWN,
      )
      if (cmd || cmd2 || cmd3 || cmd4) {
        if (this.danceArea_1.danceZone === true){
          this.danceArea_1.danceSystem.dance()
        }
        if (this.danceArea_2.danceZone === true){
          this.danceArea_2.danceSystem.routine = 'all'
          this.danceArea_2.danceSystem.dance()
        }
        if (this.danceArea_3.danceZone === true){
          this.danceArea_3.danceSystem.routine = 'all'
          this.danceArea_3.danceSystem.dance()
        }
        if (this.danceArea_4.danceZone === true){
          this.danceArea_4.danceSystem.routine = 'all'
          this.danceArea_4.danceSystem.dance()
        }
        if (this.danceArea_5.danceZone === true){
          this.danceArea_5.danceSystem.routine = 'all'
          this.danceArea_5.danceSystem.dance()
        }
        if (this.danceArea_6.danceZone === true){
          this.danceArea_6.danceSystem.routine = 'all'
          this.danceArea_6.danceSystem.dance()
        }
        if (this.danceArea_7.danceZone === true){
          this.danceArea_7.danceSystem.routine = 'all'
          this.danceArea_7.danceSystem.dance()
        }
        if (this.danceArea_8.danceZone === true){
          this.danceArea_8.danceSystem.routine = 'all'
          this.danceArea_8.danceSystem.dance()
        }
      }
    })
  }
  setUp() {
    //Base Scene.......................................
    this._scene = engine.addEntity()
    Transform.createOrReplace(this._scene, {
      position: Vector3.create(0, 0, 0),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1)
    })

    this.entity = engine.addEntity()
    Transform.createOrReplace(this.entity, {
      position: Vector3.create(8, 0, 8),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb'
    })

    this.entity2 = engine.addEntity()
    Transform.createOrReplace(this.entity2, {
      position: Vector3.create(8, 0, 24),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity2, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb'
    })

    this.entity3 = engine.addEntity()
    Transform.createOrReplace(this.entity3, {
      position: Vector3.create(8, 0, 40),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity3, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb'
    })

    //Add Music manually Here........................................
    this.music = engine.addEntity()
    Transform.createOrReplace(this.music, {
      position: Vector3.create(8.32, 0.88, 27.96),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    AudioSource.createOrReplace(this.music, {
      audioClipUrl: 'sounds/',
      loop: true,
      playing: false
    })
    //......................................................................

    //Casino ToolBox/////////////////////////////////////////
    this.toolbox = engine.addEntity()
    Transform.createOrReplace(this.toolbox, {
      position: Vector3.create(14.873678207397461, 0.09671890735626221, 28.87261199951172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })

    //Ground/First Floor MainDoor ClickArea/////////////////
    this.clickArea = engine.addEntity()
    Transform.createOrReplace(this.clickArea, {
      position: Vector3.create(8, 0.05129086971282959, 3.4753189086914062),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(5.2679362297058105, 5.57119607925415, 0.21571019291877747),
      parent: this._scene
    })

    //Ground Floor Images(EntranceRightSideV)//////////////////
    this.imageFromURL = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL, {
      position: Vector3.create(13, 1.098233938217163, 11.8459077835083),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(4, 7.5, 1),
      parent: this._scene
    })

    //Ground Floor Images(EntranceleftSideV)/////////////////////
    this.imageFromURL2 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL2, {
      position: Vector3.create(3, 1.098233938217163, 11.8459077835083),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(4, 7.5, 1),
      parent: this._scene
    })

    //Ground Floor Images(CathouseClubH)//////////////////////////
    this.imageFromURL3 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL3, {
      position: Vector3.create(0.7716683149337769, 4.080763816833496, 26.80219078063965),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(10.249049186706543, 4.674226760864258, 1.0000033378601074),
      parent: this._scene
    })

    //Ground Floor Images(VideoHallLeftV)////////////////
    this.imageFromURL4 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL4, {
      position: Vector3.create(3.5118160247802734, 2.087592124938965, 36.23207092285156),
      rotation: Quaternion.create(1.2649791204620694e-16, 1, -1.1920928244535389e-7, -2.9802322387695312e-8),
      scale: Vector3.create(3.5456924438476562, 4.674226760864258, 0.9777506589889526),
      parent: this._scene
    })

    //Ground Floor Images(VideoHallLeftV)////////////////
    this.imageFromURL5 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL5, {
      position: Vector3.create(12.316988945007324, 2.087592124938965, 36.20863723754883),
      rotation: Quaternion.create(1.2649791204620694e-16, 1, -1.1920928244535389e-7, -2.9802322387695312e-8),
      scale: Vector3.create(3.5456924438476562, 4.674226760864258, 0.9777506589889526),
      parent: this._scene
    })

    //Ground Floor Images(VideoHallLeftMultiLogo)//////////////
    this.imageFromURL6 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL6, {
      position: Vector3.create(15.594130516052246, 1.549926519393921, 40.695884704589844),
      rotation: Quaternion.create(
        -9.402984745270505e-15,
        0.7071067690849304,
        -8.429368847373553e-8,
        -0.7071068286895752
      ),
      scale: Vector3.create(8.295089721679688, 7.591179847717285, 1.0000035762786865),
      parent: this._scene
    })

    //Ground Floor VideoStream/////////////////////////
    this.videoStream = engine.addEntity()
    Transform.createOrReplace(this.videoStream, {
      position: Vector3.create(8.464138984680176, 1.0633490085601807, 47.39051055908203),
      rotation: Quaternion.create(-6.63836280257314e-15, -1, 1.1920927533992653e-7, -1.4901159417490817e-8),
      scale: Vector3.create(3.3353781700134277, 3.852238178253174, 1.0000009536743164),
      parent: this._scene
    })

    //Ground Floor VideoStream Trigger//////////////
    this.triggerArea = engine.addEntity()
    Transform.createOrReplace(this.triggerArea, {
      position: Vector3.create(7.9238691329956055, 0.03669559955596924, 40.7089729309082),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375),
      parent: this._scene
    })

    //Ground Floor Images(ElevatorRightH)///////////////
    this.imageFromURL7 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL7, {
      position: Vector3.create(15.566365242004395, 3.2104194164276123, 21.8288516998291),
      rotation: Quaternion.create(
        8.944758582000547e-17,
        0.7071068286895752,
        -8.429369557916289e-8,
        -0.7071068286895752
      ),
      scale: Vector3.create(4.556046485900879, 3.891484260559082, 0.9777539968490601),
      parent: this._scene
    })

    //Ground Floor Images(ElevatorRightH)///////////////
    this.imageFromURL8 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL8, {
      position: Vector3.create(15.566365242004395, 3.2104194164276123, 15.291440963745117),
      rotation: Quaternion.create(
        8.944758582000547e-17,
        0.7071068286895752,
        -8.429369557916289e-8,
        -0.7071068286895752
      ),
      scale: Vector3.create(4.55604887008667, 3.891484260559082, 0.9777544736862183),
      parent: this._scene
    })

    //SecondFloor VideoStream////////////////////////
    this.videoStream2 = engine.addEntity()
    Transform.createOrReplace(this.videoStream2, {
      position: Vector3.create(7.777276039123535, 12.846161842346191, 1.1220264434814453),
      rotation: Quaternion.create(3.552713678800501e-15, -1.4901159417490817e-8, 1.4298874990948882e-14, 1),
      scale: Vector3.create(3.7844345569610596, 2.405125379562378, 1.0000009536743164),
      parent: this._scene
    })

    //SecondFloor VideoStream Trigger (Center Small)//////
    this.triggerArea2 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea2, {
      position: Vector3.create(8.208050727844238, 10.446976661682129, 41.270591735839844),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(3.9054834842681885, 0.30041220784187317, 3.448207139968872),
      parent: this._scene
    })

    //SecondFloor VideoStream Trigger (CenterLong)/////////
    this.triggerArea3 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea3, {
      position: Vector3.create(7.667209625244141, 10.868925094604492, 24.61056900024414),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(6.003643989562988, 0.46044936776161194, 22.413347244262695),
      parent: this._scene
    })

    //SecondFloor VideoStream Trigger (LeftSide)/////////
    this.triggerArea4 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea4, {
      position: Vector3.create(14.138040542602539, 10.699254989624023, 10.29130744934082),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.48614615201950073, 3.8268330097198486),
      parent: this._scene
    })

    //SecondFloor VideoStream Trigger (RightSide)////////
    this.triggerArea5 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea5, {
      position: Vector3.create(1.989222526550293, 10.688300132751465, 10.241878509521484),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.47422197461128235, 3.8268330097198486),
      parent: this._scene
    })

    //Third Floor VideoStream////////////////////////////
    this.videoStream3 = engine.addEntity()
    Transform.createOrReplace(this.videoStream3, {
      position: Vector3.create(7.920665740966797, 18.821086883544922, 1.0475330352783203),
      rotation: Quaternion.create(3.552713678800501e-15, -1.4901159417490817e-8, 1.4298874990948882e-14, 1),
      scale: Vector3.create(3.6798388957977295, 2.8050894737243652, 1.0000009536743164),
      parent: this._scene
    })

    //Third Floor VideoStream Trigger (RightSide) ////////////
    this.triggerArea6 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea6, {
      position: Vector3.create(14.118785858154297, 17.828983306884766, 12.364847183227539),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.5463231205940247, 3.8268330097198486),
      parent: this._scene
    })

    //Third Floor VideoStream Trigger (LeftSide) ///////////
    this.triggerArea7 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea7, {
      position: Vector3.create(1.9480457305908203, 17.84688377380371, 12.353545188903809),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.5436291098594666, 3.8268330097198486),
      parent: this._scene
    })

    //Fourth Floor VideoStream (RightSide)///////
    this.videoStream4 = engine.addEntity()
    Transform.createOrReplace(this.videoStream4, {
      position: Vector3.create(8.053211212158203, 23.609941482543945, 30.861600875854492),
      rotation: Quaternion.create(-5.3015830285129285e-15, 2.9802322387695312e-8, 3.552713678800501e-15, -1),
      scale: Vector3.create(1.0841877460479736, 1.7689199447631836, 1),
      parent: this._scene
    })

    //Fourth Floor VideoStream (LeftSide)////////////////
    this.videoStream5 = engine.addEntity()
    Transform.createOrReplace(this.videoStream5, {
      position: Vector3.create(8.048172950744629, 23.593040466308594, 27.55222152709961),
      rotation: Quaternion.create(3.5961016709741816e-15, 1, -1.1920927533992653e-7, 1.1920927533992653e-7),
      scale: Vector3.create(1.0841909646987915, 1.7689199447631836, 1.000003457069397),
      parent: this._scene
    })

    //Fourth Floor NFT Picture Frame1///////////////////////////
    this.nftPictureFrame = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame, {
      position: Vector3.create(0.5295686721801758, 24.883743286132812, 38.06391143798828),
      rotation: Quaternion.create(
        -1.8126884118485924e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(6.00002384185791, 5.621730804443359, 0.45611241459846497),
      parent: this._scene
    })

    //Fourth Floor NFT Picture Frame2///////////////////////////
    this.nftPictureFrame2 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame2, {
      position: Vector3.create(0.5295686721801758, 24.883743286132812, 33.56391143798828),
      rotation: Quaternion.create(
        -1.8126884118485924e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(6.000029563903809, 5.621730804443359, 0.45611265301704407),
      parent: this._scene
    })

    //Fourth Floor NFT Picture Frame3///////////////////////////
    this.nftPictureFrame3 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame3, {
      position: Vector3.create(0.5295686721801758, 24.883743286132812, 29.06391143798828),
      rotation: Quaternion.create(
        -1.8126884118485924e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(6.000032424926758, 5.621730804443359, 0.4561127722263336),
      parent: this._scene
    })

    //Fourth Floor NFT Picture Frame4///////////////////////////
    this.nftPictureFrame4 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame4, {
      position: Vector3.create(0.5295686721801758, 24.883743286132812, 24.56391143798828),
      rotation: Quaternion.create(
        -1.8126884118485924e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(6.000035285949707, 5.621730804443359, 0.45611289143562317),
      parent: this._scene
    })

    //Top Floor TriggerArea////////////////////////////////
    this.triggerArea8 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea8, {
      position: Vector3.create(8.126971244812012, 28.760574340820312, 34.119720458984375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(5.48532772064209, 0.2400498241186142, 8.471725463867188),
      parent: this._scene
    })

    //Top Floor VideoStream///////////////////////////////
    this.videoStream6 = engine.addEntity()
    Transform.createOrReplace(this.videoStream6, {
      position: Vector3.create(8.29113483428955, 29.396575927734375, 47.40890121459961),
      rotation: Quaternion.create(-6.63836280257314e-15, -1, 1.1920927533992653e-7, -1.4901159417490817e-8),
      scale: Vector3.create(4.295584678649902, 3.3984553813934326, 1.0000009536743164),
      parent: this._scene
    })

    //Floor Buttons/////////////////////////////////////////

    //Ground Floor Buttons/////////////////////////////////////////

    //Ground Floor 1st floorbtn......................
    this.tofirstfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton, {
      position: Vector3.create(15.23768424987793, 1.6894843578338623, 23.796602249145508),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton, { src: this.floor_button_1 })
    const tofirstfloorbutton_collider = engine.addEntity()
    Transform.create(tofirstfloorbutton_collider, {
      position: Vector3.create(15.23768424987793, 1.6894843578338623, 23.796602249145508),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    //Ground Floor 2nd floorbtn......................
    this.tosecondfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton, {
      position: Vector3.create(15.227154731750488, 1.9373252391815186, 23.43264389038086),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton, { src: this.floor_button_2 })
    const tosecondfloorbutton_collider = engine.addEntity()
    Transform.create(tosecondfloorbutton_collider, {
      position: Vector3.create(15.227154731750488, 1.9373252391815186, 23.43264389038086),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    //Ground Floor 3rd floorbtn......................
    this.tothirdfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton, {
      position: Vector3.create(15.239447593688965, 1.7488524913787842, 23.079757690429688),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton, { src: this.floor_button_3 })
    const tothirdfloorbutton_collider = engine.addEntity()
    Transform.create(tothirdfloorbutton_collider, {
      position: Vector3.create(15.239447593688965, 1.7488524913787842, 23.079757690429688),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub VIP'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    //Ground Floor 4th floorbtn......................
    this.tofourthfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton, {
      position: Vector3.create(15.241415023803711, 1.337921142578125, 23.0618896484375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton, { src: this.floor_button_4 })
    const tofourthfloorbutton_collider = engine.addEntity()
    Transform.create(tofourthfloorbutton_collider, {
      position: Vector3.create(15.241415023803711, 1.337921142578125, 23.0618896484375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    //Ground Floor 5th loorbtn......................
    this.tofifthfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton, {
      position: Vector3.create(15.242955207824707, 1.1119731664657593, 23.432022094726562),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton, { src: this.floor_button_5 })
    const tofifthfloorbutton_collider = engine.addEntity()
    Transform.create(tofifthfloorbutton_collider, {
      position: Vector3.create(15.242955207824707, 1.1119731664657593, 23.432022094726562),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'UnderConstruction'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    //Ground Floor top floorbtn......................
    this.totopfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton, {
      position: Vector3.create(15.22166633605957, 1.30178964138031, 23.835508346557617),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton, { src: this.floor_button_6 })
    const totopfloorbutton_collider = engine.addEntity()
    Transform.create(totopfloorbutton_collider, {
      position: Vector3.create(15.22166633605957, 1.30178964138031, 23.835508346557617),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'RoofTop Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    //Second Floor Buttons/////////////////////////////////////////

    //Second Floor 1st floorbtn......................
    this.tofirstfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton2, {
      position: Vector3.create(15.23768424987793, 11.706573486328125, 22.60639762878418),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton2, { src: this.floor_button_1 })
    const tofirstfloorbutton2_collider = engine.addEntity()
    Transform.create(tofirstfloorbutton2_collider, {
      position: Vector3.create(15.23768424987793, 11.706573486328125, 22.60639762878418),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    //Second Floor 2nd floorbtn......................
    this.tosecondfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton2, {
      position: Vector3.create(15.227154731750488, 11.954414367675781, 22.24243927001953),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton2, { src: this.floor_button_2 })
    const tosecondfloorbutton2_collider = engine.addEntity()
    Transform.create(tosecondfloorbutton2_collider, {
      position: Vector3.create(15.227154731750488, 11.954414367675781, 22.24243927001953),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    //Second Floor 3rd floorbtn......................
    this.tothirdfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton2, {
      position: Vector3.create(15.239447593688965, 11.765941619873047, 21.88955307006836),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton2, { src: this.floor_button_3 })
    const tothirdfloorbutton2_collider = engine.addEntity()
    Transform.create(tothirdfloorbutton2_collider, {
      position: Vector3.create(15.239447593688965, 11.765941619873047, 21.88955307006836),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub VIP'
        }
      },
      () => {
        this.elevator(3)
      }
    )
    //Second Floor 4th floorbtn......................
    this.tofourthfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton2, {
      position: Vector3.create(15.241415023803711, 11.355010032653809, 21.871685028076172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton2, { src: this.floor_button_4 })
    const tofourthfloorbutton2_collider = engine.addEntity()
    Transform.create(tofourthfloorbutton2_collider, {
      position: Vector3.create(15.241415023803711, 11.355010032653809, 21.871685028076172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )
    //Second Floor 5th floorbtn......................
    this.tofifthfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton2, {
      position: Vector3.create(15.242955207824707, 11.12906265258789, 22.241817474365234),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton2, { src: this.floor_button_5 })
    const tofifthfloorbutton2_collider = engine.addEntity()
    Transform.create(tofifthfloorbutton2_collider, {
      position: Vector3.create(15.242955207824707, 11.12906265258789, 22.241817474365234),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'UnderConstruction'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    //Second Floor top floorbtn......................
    this.totopfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton2, {
      position: Vector3.create(15.22166633605957, 11.318879127502441, 22.64530372619629),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton2, { src: this.floor_button_6 })
    const totopfloorbutton2_collider = engine.addEntity()
    Transform.create(totopfloorbutton2_collider, {
      position: Vector3.create(15.22166633605957, 11.318879127502441, 22.64530372619629),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton2_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton2_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'RoofTop Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    //Third Floor Buttons/////////////////////////////////////////

    //Third Floor 1st floorbtn......................
    this.tofirstfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton3, {
      position: Vector3.create(0.7356014251708984, 18.60797882080078, 6.383121490478516),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton3, { src: this.floor_button_1 })
    const tofirstfloorbutton3_collider = engine.addEntity()
    Transform.create(tofirstfloorbutton3_collider, {
      position: Vector3.create(0.7356014251708984, 18.60797882080078, 6.383121490478516),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    //Third Floor 2nd floorbtn......................
    this.tosecondfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton3, {
      position: Vector3.create(0.7461305260658264, 18.855819702148438, 6.747079372406006),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton3, { src: this.floor_button_2 })
    const tosecondfloorbutton3_collider = engine.addEntity()
    Transform.create(tosecondfloorbutton3_collider, {
      position: Vector3.create(0.7461305260658264, 18.855819702148438, 6.747079372406006),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    //Third Floor 3rd floorbtn......................
    this.tothirdfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton3, {
      position: Vector3.create(0.7338376045227051, 18.667346954345703, 7.099966049194336),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton3, { src: this.floor_button_3 })
    const tothirdfloorbutton3_collider = engine.addEntity()
    Transform.create(tothirdfloorbutton3_collider, {
      position: Vector3.create(0.7338376045227051, 18.667346954345703, 7.099966049194336),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    //Third Floor 4th floorbtn......................
    this.tofourthfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton3, {
      position: Vector3.create(0.7318701148033142, 18.25641441345215, 7.117834091186523),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton3, { src: this.floor_button_4 })
    const tofourthfloorbutton3_collider = engine.addEntity()
    Transform.create(tofourthfloorbutton3_collider, {
      position: Vector3.create(0.7318701148033142, 18.25641441345215, 7.117834091186523),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    //Third Floor 5th floorbtn......................
    this.tofifthfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton3, {
      position: Vector3.create(0.7303299307823181, 18.030467987060547, 6.747701644897461),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton3, { src: this.floor_button_5 })
    const tofifthfloorbutton3_collider = engine.addEntity()
    Transform.create(tofifthfloorbutton3_collider, {
      position: Vector3.create(0.7303299307823181, 18.030467987060547, 6.747701644897461),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'UnderConstruction'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    //Third Floor top floorbtn......................
    this.totopfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton3, {
      position: Vector3.create(0.7516188621520996, 18.220285415649414, 6.344215393066406),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton3, { src: this.floor_button_6 })
    const totopfloorbutton3_collider = engine.addEntity()
    Transform.create(totopfloorbutton3_collider, {
      position: Vector3.create(0.7516188621520996, 18.220285415649414, 6.344215393066406),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton3_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton3_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'RoofTop Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    //Fourth Floor Buttons/////////////////////////////////////////

    //Fourth Floor 1st floorbtn......................
    this.tofirstfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton4, {
      position: Vector3.create(15.349342346191406, 24.92435073852539, 24.03135871887207),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton4, { src: this.floor_button_1 })
    const tofirstfloorbutton4_collider = engine.addEntity()
    Transform.create(tofirstfloorbutton4_collider, {
      position: Vector3.create(15.349342346191406, 24.92435073852539, 24.03135871887207),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    //Fourth Floor 2nd floorbtn......................
    this.tosecondfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton4, {
      position: Vector3.create(15.338813781738281, 25.172191619873047, 23.667400360107422),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton4, { src: this.floor_button_2 })
    const tosecondfloorbutton4_collider = engine.addEntity()
    Transform.create(tosecondfloorbutton4_collider, {
      position: Vector3.create(15.338813781738281, 25.172191619873047, 23.667400360107422),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub'
        }
      },
      () => {
        this.elevator(2)
      }
    )
    //Fourth Floor 3rd floorbtn......................
    this.tothirdfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton4, {
      position: Vector3.create(15.351106643676758, 24.983718872070312, 23.314512252807617),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton4, { src: this.floor_button_3 })
    const tothirdfloorbutton4_collider = engine.addEntity()
    Transform.create(tothirdfloorbutton4_collider, {
      position: Vector3.create(15.351106643676758, 24.983718872070312, 23.314512252807617),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub VIP'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    //Fourth Floor 4th floorbtn......................
    this.tofourthfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton4, {
      position: Vector3.create(15.353073120117188, 24.572786331176758, 23.29664421081543),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton4, { src: this.floor_button_4 })
    const tofourthfloorbutton4_collider = engine.addEntity()
    Transform.create(tofourthfloorbutton4_collider, {
      position: Vector3.create(15.353073120117188, 24.572786331176758, 23.29664421081543),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    //Fourth Floor 5th floorbtn......................
    this.tofifthfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton4, {
      position: Vector3.create(15.3546142578125, 24.346839904785156, 23.666776657104492),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton4, { src: this.floor_button_5 })
    const tofifthfloorbutton4_collider = engine.addEntity()
    Transform.create(tofifthfloorbutton4_collider, {
      position: Vector3.create(15.3546142578125, 24.346839904785156, 23.666776657104492),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'UnderConstruction'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    //Fourth Floor top floorbtn......................
    this.totopfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton4, {
      position: Vector3.create(15.333324432373047, 24.536657333374023, 24.07026481628418),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton4, { src: this.floor_button_6 })
    const totopfloorbutton4_collider = engine.addEntity()
    Transform.create(totopfloorbutton4_collider, {
      position: Vector3.create(15.333324432373047, 24.536657333374023, 24.07026481628418),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton4_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton4_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'RoofTop Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    //Top Floor Buttons/////////////////////////////////////////

    //Top Floor 1st floorbtn......................
    this.tofirstfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton5, {
      position: Vector3.create(14.98353385925293, 30.0623836517334, 23.698261260986328),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton5, { src: this.floor_button_1 })
    const tofirstfloorbutton5_collider = engine.addEntity()
    Transform.create(tofirstfloorbutton5_collider, {
      position: Vector3.create(14.98353385925293, 30.0623836517334, 23.698261260986328),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    //Top Floor 2nd floorbtn......................
    this.tosecondfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton5, {
      position: Vector3.create(14.973005294799805, 30.310224533081055, 23.33430290222168),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton5, { src: this.floor_button_2 })
    const tosecondfloorbutton5_collider = engine.addEntity()
    Transform.create(tosecondfloorbutton5_collider, {
      position: Vector3.create(14.973005294799805, 30.310224533081055, 23.33430290222168),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    //Top Floor 3rd floorbtn......................
    this.tothirdfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton5, {
      position: Vector3.create(14.985298156738281, 30.12175178527832, 22.981414794921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton5, { src: this.floor_button_3 })
    const tothirdfloorbutton5_collider = engine.addEntity()
    Transform.create(tothirdfloorbutton5_collider, {
      position: Vector3.create(14.985298156738281, 30.12175178527832, 22.981414794921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'StripClub VIP'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    //Top Floor 4th floorbtn......................
    this.tofourthfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton5, {
      position: Vector3.create(14.987264633178711, 29.710819244384766, 22.963546752929688),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton5, { src: this.floor_button_4 })
    const tofourthfloorbutton5_collider = engine.addEntity()
    Transform.create(tofourthfloorbutton5_collider, {
      position: Vector3.create(14.987264633178711, 29.710819244384766, 22.963546752929688),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    //Top Floor 5th floorbtn......................
    this.tofifthfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton5, {
      position: Vector3.create(14.988805770874023, 29.484872817993164, 23.33367919921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton5, { src: this.floor_button_5 })
    const tofifthfloorbutton5_collider = engine.addEntity()
    Transform.create(tofifthfloorbutton5_collider, {
      position: Vector3.create(14.988805770874023, 29.484872817993164, 23.33367919921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'UnderConstruction'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    //Top Floor top floorbtn......................
    this.totopfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton5, {
      position: Vector3.create(14.96751594543457, 29.67469024658203, 23.737167358398438),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton5, { src: this.floor_button_6 })
    const totopfloorbutton5_collider = engine.addEntity()
    Transform.create(totopfloorbutton5_collider, {
      position: Vector3.create(14.96751594543457, 29.67469024658203, 23.737167358398438),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton5_collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton5_collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    //Floor Buttons Ends Here/////////////////////////////////////////

    //Casino Main Door////////////////////////////////////////////////////
    this.door = engine.addEntity()
    Transform.createOrReplace(this.door, {
      position: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000014305114746, 1, 1.0000014305114746),
      parent: this._scene
    })
    GltfContainer.create(this.door, { src: 'assets/scene/models/b8c79e3b-c157-4095-bb8d-a4bf9fb561b7/door.glb' })
    MeshCollider.setBox(this.door)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.door,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open Door'
        }
      },
      () => {
        this.prompt.show()
      }
    )

    //promo Banar Images(OutSideV)/////////////////////////////

    this.imageFromURL9 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL9, {
      position: Vector3.create(7.792987823486328, 10.60340690612793, 0.5769305229187012),
      rotation: Quaternion.create(-1.158991539486386e-14, -1, 1.1920927533992653e-7, 0),
      scale: Vector3.create(6.464900016784668, 17.48285484313965, 1.0000008344650269),
      parent: this._scene
    })

    //Third Floor BaseFile........................................
    this.thirdfloor = engine.addEntity()
    Transform.createOrReplace(this.thirdfloor, {
      position: Vector3.create(8.063750267028809, 0, 24.368267059326172),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.thirdfloor, {
      src: 'assets/scene/models/195c413e-ee13-4dd5-9660-261163283d20/3.glb'
    })

    //Fourth Floor BaseFile........................................
    this.fourthfloor = engine.addEntity()

    Transform.createOrReplace(this.fourthfloor, {
      position: Vector3.create(8.044194221496582, 13.5, 23.946048736572266),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.000002145767212, 1, 1.000002145767212),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.fourthfloor, {
      src: 'assets/scene/models/4a283613-46ca-4518-877f-64d39f76f85d/fourthFloor.glb'
    })

    //Ground/First Floor BaseFile........................................
    this.groundfirstfloor = engine.addEntity()

    Transform.createOrReplace(this.groundfirstfloor, {
      position: Vector3.create(8.040163040161133, 0, 24.287254333496094),
      rotation: Quaternion.create(
        -2.3439682286736973e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000011920928955, 1, 1.0000011920928955),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.groundfirstfloor, {
      src: 'assets/scene/models/547ade1d-9309-47a9-a4f7-ad43eab9e73d/groundFirstFloor.glb'
    })

    //Second Floor BaseFile........................................
    this.secondfloor = engine.addEntity()

    Transform.createOrReplace(this.secondfloor, {
      position: Vector3.create(8.048648834228516, 0, 24.342308044433594),
      rotation: Quaternion.create(-1.8755975488411692e-15, -0.70710688829422, 8.429370268459024e-8, 0.7071067690849304),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.secondfloor, {
      src: 'assets/scene/models/14968ac1-70ee-4922-82f6-26ea5a65669d/secondFloor.glb'
    })

    //Top Floor BaseFile........................................
    this.topfloor = engine.addEntity()

    Transform.createOrReplace(this.topfloor, {
      position: Vector3.create(8.000000953674316, 28.659902572631836, 24),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000011920928955, 1, 1.0000011920928955),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.topfloor, {
      src: 'assets/scene/models/0f3495ca-6b04-4654-a68e-c2eb204bce9b/TopFloor2.glb'
    })

    //Top Floor Video Screen Restriction1..................................
    this.invisibleWall = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall, {
      position: Vector3.create(10.995407104492188, 28.65835189819336, 41.530277252197266),
      rotation: Quaternion.create(
        -7.165475217297754e-16,
        -0.37961769104003906,
        4.5253948144363676e-8,
        0.9251434803009033
      ),
      scale: Vector3.create(7.605588912963867, 8.16878604888916, 0.19648778438568115),
      parent: this._scene
    })

    //Top Floor Video Screen Restriction2..................................
    this.invisibleWall2 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall2, {
      position: Vector3.create(5.181422233581543, 28.65835189819336, 41.274803161621094),
      rotation: Quaternion.create(
        2.4620346688838165e-16,
        -0.35205742716789246,
        4.196850511561934e-8,
        -0.9359784722328186
      ),
      scale: Vector3.create(7.6055908203125, 8.16878604888916, 0.19648781418800354),
      parent: this._scene
    })

    //Top Floor Video Screen Restriction3..................................
    this.invisibleWall3 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall3, {
      position: Vector3.create(1.7791709899902344, 28.541820526123047, 43.311126708984375),
      rotation: Quaternion.create(
        2.0026262329079494e-15,
        0.005122534930706024,
        -6.106610772604881e-10,
        -0.9999869465827942
      ),
      scale: Vector3.create(2.885469913482666, 8.16878604888916, 0.19595777988433838),
      parent: this._scene
    })
    //Top Floor Video Screen Restriction4.......................................
    this.invisibleWall4 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall4, {
      position: Vector3.create(14.164913177490234, 28.541820526123047, 43.31113052368164),
      rotation: Quaternion.create(
        2.0026262329079494e-15,
        0.005122534930706024,
        -6.106610772604881e-10,
        -0.9999869465827942
      ),
      scale: Vector3.create(2.885469913482666, 8.16878604888916, 0.19595777988433838),
      parent: this._scene
    })
  }
  elevator(floor: number) {
    switch (floor) {
      case 1:
        movePlayerTo({
          newRelativePosition: Vector3.create(12.43, 0.88, 24.14)
        })
        break
      case 2:
        if (!payMana) {
          accessSecondFloor()
        } else if (payMana) {
          movePlayerTo({
            newRelativePosition: Vector3.create(12.43, 10.92, 24.14)
          })
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'mana')
        }
        break
      case 3:
        if (!payMana2) {
          accessThirdFloor()
        } else if (payMana2) {
          movePlayerTo({
            newRelativePosition: Vector3.create(4.01, 18.08, 6.51)
          })
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'mana')
        }
        break
      case 4:
        movePlayerTo({
          newRelativePosition: Vector3.create(14.25, 24.56, 23.9)
        })
        break
      case 5:
        // under construction
        break
      case 6:
        movePlayerTo({
          newRelativePosition: Vector3.create(12.43, 28.92, 24.14)
        })
        break
    }
  }
}
