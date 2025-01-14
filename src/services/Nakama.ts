import { 
  Client, 
  Session,
  Socket,
} from "@heroiclabs/nakama-js"

import store from "../stores";
import { 
  setLobbyJoined,
  setRoomJoined,
  setWorldJoined,
  setWorldRooms
} from "../stores/slices/WorldSlice";

import { Faction, World } from "../models/worlds";
import { ListAvailableRoomMessage, OpCode, Room } from "../territory";

class NakamaClient {
  private client: Client
  private session: Session
  public socket: Socket

  constructor() {
    this.client = new Client('defaultkey', '127.0.0.1', '7350', false);
  }

  async authenticateEmail(
    email: string,
    password: string
  ) {
    try {
      this.session = await this.client.authenticateEmail(email, password, false);
      this.socket = this.client.createSocket();
      this.socket.connect(this.session, false);

      store.dispatch(setLobbyJoined(true));
    } 
    catch (error) {
      console.error("Error authenticating email: ", error);
    }

    return this.session;
  }

  async fetchUserInfo() {
    try {
      const account = await this.client.getAccount(this.session);
      return account;
    } 
    catch (error) {
      console.error("Error fetching user information: ", error);
    }
  }

  async fetchAvailableWorlds() : Promise<World[]> {
    try {
      const response = await this.client.listStorageObjects(
        this.session,
        "worlds",
        undefined,
        7,
      )

      const worlds : Array<World> = response
        .objects
        .filter(obj => obj.value !== undefined)
        .map(obj => obj.value as World);

      return worlds;
    } 
    catch (error) {
      console.error("Error listing matches: ", error);
      return [];
    }
  }

  async joinWorld(matchId: string) : Promise<World> {
    try {
      this.initialize();
    
      const match = await this.socket.joinMatch(matchId); 

      return {
        name: match.label,
        match_id: match.match_id,
        avatar: match.label,
        selectedAvatar: match.label
      } as World;
    } 
    catch (error) {
      console.error("Error joining match: ", error);
      return {
        name: "World not found",	
        match_id: "",
        avatar: "",
        selectedAvatar: ""
      } as World;
    }
  }

  async listFactions() : Promise<Faction[]> {
    try {
      const response = await this.client.listStorageObjects(
          this.session,
          "factions",
          undefined,
          7,
      );

      const factions: Array<Faction> = response
        .objects
        .filter(obj => obj.value !== undefined)
        .map(obj => obj.value as Faction);

      return factions;
    } 
    catch (error) {
      console.error("Error listing factions: ", error);
      return  [];
    }
  }

  async initialize() {
    this.socket.onmatchdata = (matchData) => {
      console.log("Match data received: ", matchData);
      const json_string = new TextDecoder().decode(matchData.data)
      const json = json_string ? JSON.parse(json_string): ""
      
      switch (matchData.op_code) {
        case OpCode.OPCODE_USER_JOIN:
          console.log("Match data received: ", matchData.data);
          break;

        case OpCode.OPCODE_ROOMS_LIST_AVAILABLE:
          const message = ListAvailableRoomMessage.fromJson(json);
          store.dispatch(setWorldRooms(message.rooms));

          console.log("List Match data decoded: ", message);

          break;

        case OpCode.OPCODE_ROOM_UPDATE:
          console.log("Match data received: ", matchData.data);
          store.dispatch(setRoomJoined("test"));

          break;

        default:
          break;
      }
    }
  }
}

export default NakamaClient;