import {_decorator, Component, instantiate, Prefab, Vec3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('BaseMonster')
export class BaseMonster extends Component {
    //子弹
    @property({type: Prefab})
    public bullet: Prefab | null = null;
    //子弹发射频率
    protected bulletRate: number | 0 = 0.3
    // 怪物当前位置
    protected _curPos: Vec3 = new Vec3();
    //移动速度
    protected moveRate: number = 1

    start() {
        let y = this.node.parent.height / 2
        let x = Math.random() * (this.node.parent.width - this.node.width)
        x = x - (this.node.parent.width - this.node.width) / 2
        this.node.setPosition(new Vec3(x, y, this._curPos.z));
        this.moveRate = Math.random() * 5 + 1
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

    update(deltaTime: number) {
        this.node.getPosition(this._curPos);
        this.node.setPosition(new Vec3(this._curPos.x, this._curPos.y - this.moveRate, this._curPos.z))
        if (this._curPos.y < (-this.node.parent.height + this.node.height) / 2) {
            this.node.destroy()
        }
    }
}


