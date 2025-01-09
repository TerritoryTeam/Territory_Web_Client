
import { Scene } from 'phaser';
import { globalContainer } from '../../providers/GlobalProvider';
import { UserJoinLeaveMessage } from '../../territory';

export class LoadingScene extends Scene
{

    constructor ()
    {
        super('LoadingScene');
    }

    preload () 
    {
        globalContainer.nakama.joinMatch("12345");
    }

    create ()
    {
        this.nakamaListener()
    }

    private nakamaListener() {
        globalContainer.nakama.socket.onmatchdata = (result) => {
            switch (result.op_code) {
                case 1:
                case 2:
                    console.log("User Joined or Leave");
                    const data = UserJoinLeaveMessage.fromBinary(result.data)
                    console.log(data);
                    break;
                default:
                    console.log("Unknown OpCode");
            }
        };
    }
}
