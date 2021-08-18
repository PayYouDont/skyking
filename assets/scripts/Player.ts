import {_decorator, Component, instantiate, Node, Prefab, Vec3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('Player')
export class Player extends Component {
    //子弹
    @property({type: Prefab})
    public bullet: Prefab | null = null;
    //子弹发射频率
    private bulletRate: number | 0 = 0.5
    // 当前角色位置
    private _curPos: Vec3 = new Vec3();
    //移动速度
    private moveRate: number = 5
    private minX: number | 0 = 0;
    private maxX: number | 0 = 0;
    private minY: number | 0 = 0;
    private maxY: number | 0 = 0;

    start() {
        this.minX = (-this.node.parent.width + this.node.width) / 2
        this.maxX = (this.node.parent.width - this.node.width) / 2
        this.minY = (-this.node.parent.height + this.node.height) / 2
        this.maxY = (this.node.parent.height - this.node.height) / 2
        this.move()
        this.createBullets()
    }

    createBullets() {
        this.schedule(() => {
            let newBullet = instantiate(this.bullet)
            newBullet.parent = this.node.parent
            this.node.getPosition(this._curPos);
            newBullet.setPosition(this._curPos)
        }, this.bulletRate)
    }

    move() {
        this.node.parent.on(Node.EventType.TOUCH_MOVE, event => {
            this.opacity = 255;
            let delta = event.touch.getDelta();
            this.node.getPosition(this._curPos);
            let moveX, moveY
            if (delta.x > this.moveRate) {
                moveX = this.moveRate
            } else if (delta.x < -this.moveRate) {
                moveX = -this.moveRate
            } else {
                moveX = delta.x
            }
            if (delta.y > this.moveRate) {
                moveY = this.moveRate
            } else if (delta.y < -this.moveRate) {
                moveY = -this.moveRate
            } else {
                moveY = delta.y
            }
            let x = this._curPos.x + moveX;
            let y = this._curPos.y + moveY;
            if (this._curPos.x > this.maxX) {
                x = this.maxX
            } else if (this._curPos.x < this.minX) {
                x = this.minX
            }
            if (y > this.maxY) {
                y = this.maxY
            } else if (y < this.minY) {
                y = this.minY
            }
            let z = this._curPos.z;
            let pos = new Vec3(x, y, z)
            this.node.setPosition(pos)
        }, this.node);
    }

    update(deltaTime: number) {
        // this.bulletList.forEach(bullet => {
        //     let pos = new Vec3();
        //     bullet.getPosition(pos)
        //     if (pos.y > this.node.parent.height / 2) {
        //         bullet.active = false;
        //     }
        // })
    }

}