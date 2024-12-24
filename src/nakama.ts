import { Client, Session, Socket } from "@heroiclabs/nakama-js"

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
}

export default NakamaClient;