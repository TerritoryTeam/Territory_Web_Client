const { Client, Session, RpcFunction } = require("@heroiclabs/nakama-js");


const client = new Client("defaultkey", "localhost", "7350", false);  

async function createSession() {
  try {
    
    const session = await client.authenticateEmail("test@microsoft.com", "TestTest", false);
    console.log("Successfully logged in as user", session.user_id);

    return session;
  } catch (err) {
    console.error("Error creating session", err);
  }
}


async function callRpc(session) {
  try {
    const socket = client.createSocket(false, false);
    await socket.connect(session, true);

    const result = await socket.joinMatch(matchID);

    console.log("RPC Response:", result);

    return result;
  } catch (err) {
    console.error("Error calling RPC", err);
    return null;
  }
}

async function listMatch(session) {
    try {
        var minPlayers = 0;
        var maxPlayers = 10;
        var limit = 10;
        var authoritative = true;
        var label = "";
        var query = "";
        const result = await client.listMatches(session, limit, authoritative, label, minPlayers, maxPlayers,  query);

        console.log(result);

        result.matches.forEach(function(match){
            console.log("%o: %o/10 players", match.match_id, match.label);
        });

        return null
    } catch (err) {
        console.error("Error listing matches", err);
        return null;
    }
    
}

async function main() {
  const session = await createSession();
  if (session) {
    await listMatch(session);
  }
}

main();