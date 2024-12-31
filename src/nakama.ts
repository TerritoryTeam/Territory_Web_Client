import { 
  Client, 
  Session, 
  Socket 
} from "@heroiclabs/nakama-js"

class NakamaClient {
  private client: Client
  private session: Session

  constructor() {
    this.client = new Client('defaultkey', '127.0.0.1', '7350', false);
  }

  async authenticateEmail(
    email: string,
    password: string
  ) {
    try {
      this.session = await this.client.authenticateEmail(email, password, false);
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

  async listMatches() {
    try {
      var minPlayers = 0;
      var maxPlayers = 10;
      var limit = 10;
      var authoritative = true;
      var label = "";
      var query = "";

      const matches = await this.client.listMatches(this.session, limit, authoritative, label, minPlayers, maxPlayers, query);
      return matches;
    } 
    catch (error) {
      console.error("Error listing matches: ", error);
    }
  }
}

export default NakamaClient;