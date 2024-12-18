import { Client, Session, Socket } from "@heroiclabs/nakama-js"
import { v4 as uuidv4 } from "uuid"

class Nakama {
  private client: Client
  private session: Session
  private socket: Socket

  constructor() {
  }

  async authenticate() {
    this.client = new Client("defaultkey", "127.0.0.1", "7350", false);

    let deviceId = localStorage.getItem("device-id");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("device_id", deviceId as string);
    }

    this.session = await this.client.authenticateCustom(deviceId as string, true);
    localStorage.setItem("user_id", this.session.user_id as string);

    const trace = false;
    this.socket = this.client.createSocket(false, trace);
    await this.socket.connect(this.session, false);
  }
}

export default new Nakama()