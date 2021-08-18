import {_decorator, Vec3} from 'cc';
import {BaseBullet} from "./BaseBullet";

const {ccclass, property} = _decorator;

@ccclass('Bullet')
export class Bullet extends BaseBullet {
    //移动速度
    protected rate: number = 10

    update(deltaTime: number) {
        this.node.getPosition(this._curPos);
        let newPos = new Vec3(this._curPos.x, this._curPos.y + this.rate, this._curPos.z)
        this.node.setPosition(newPos)
        let monsters = this.node.parent.getComponentsInChildren("BaseMonster");
        monsters.forEach(monster => {
            let pos = new Vec3()
            monster.node.getPosition(pos)
            if (Math.abs(pos.x - newPos.x) < (this.node.width + monster.node.width) / 2 &&
                Math.abs(pos.y - newPos.y) < (this.node.width + monster.node.width) / 2) {
                this.node.destroy()
                this.gameManager.score(monster)
                return
            }
        })
        if (this._curPos.y > (this.node.parent.height - this.node.height) / 2) {
            this.node.destroy()
        }
    }

}
