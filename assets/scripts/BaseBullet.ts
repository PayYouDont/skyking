import {_decorator, Component, Vec3} from 'cc';
import {Player} from "./Player";
import {GameManager} from "./GameManager";
const {ccclass, property} = _decorator;

@ccclass('BaseBullet')
export class BaseBullet extends Component {

    //移动速度
    protected rate: number = 10
    //伤害值
    protected hurtValue: number = 1
    // 当前位置
    protected _curPos: Vec3 = new Vec3();
    //发射角度
    protected rotation: number = 0
    protected player: Player = null
    protected gameManager:GameManager = null
    start() {
        this.player = this.node.parent.getComponentInChildren("Player")
        this.gameManager = this.node.parent.getComponent(GameManager)
    }

    update(deltaTime: number) {
        this.node.getPosition(this._curPos);
        let newPos = new Vec3(this._curPos.x, this._curPos.y - this.rate, this._curPos.z)
        this.node.setPosition(newPos)
        let pos = new Vec3()
        this.player.node.getPosition(pos);
        if (Math.abs(pos.x - newPos.x) < (this.node.width + this.player.node.width) / 2 &&
            Math.abs(pos.y - newPos.y) < (this.node.width + this.player.node.width) / 2) {
            this.node.destroy()
            this.gameManager.gameOver()
            return
        }
        if (this._curPos.y < (-this.node.parent.height + this.node.height) / 2) {
            this.node.destroy()
        }
    }
}

