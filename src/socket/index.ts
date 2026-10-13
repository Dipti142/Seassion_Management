import type http from "http";
import { initSocket as createSocket, getSocket } from "./socket.server";
import { registerSocketEvents } from "./socket.handler";

export { getSocket };

export function initSocket(httpServer: http.Server) {
  const io = createSocket(httpServer);
  registerSocketEvents(io);
  return io;
}
