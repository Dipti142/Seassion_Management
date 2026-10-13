import type { Server, Socket } from "socket.io";
import { authenticateSocket } from "./socket.auth";
import { joinUserRoom } from "./socket.service";

export function registerSocketEvents(io: Server) {
  io.use(authenticateSocket);

  io.on("connection", (socket: Socket) => {
    joinUserRoom(socket, socket.data.user.id);
  });
}
