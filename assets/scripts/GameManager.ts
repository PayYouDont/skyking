import {_decorator, Component, instantiate, Prefab} from 'cc';

import {Player} from "./Player";

const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // 关联 Player 节点身上 Player 组件
    @property({type: Player})
    public player: Player | null = null;
    //怪物1b
    @property({type: Prefab})
    public monster1b: Prefab | null = null;

    start() {
        this.createMonster1b()
    }

    createMonster1b() {
        this.schedule(() => {
            let newMonster1b = instantiate(this.monster1b)
            newMonster1b.parent = this.node
        }, 2)
    }

    update(deltaTime: number) {
        // let bullets = this.node.getComponentsInChildren("Bullet");
        // let monsters = this.node.getComponentsInChildren("BaseMonster");
        // this.verdictHit(bullets, monsters)
    }
    gameOver(){
        console.log("game over")
    }
    score(monster){
        console.log(monster)
    }
}

