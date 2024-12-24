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

    console.log("Session: ", this.session);	
    console.log("User ID: ", this.session.user_id);
    console.log("Username: ", this.session.username);
    console.log("Token: ", this.session.token);
    console.log("Refresh Token: ", this.session.refresh_token);
    console.log("Test");

    return this.session;
  }
}

export default NakamaClient;