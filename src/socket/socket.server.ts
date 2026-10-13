import type http from "http";
import { Server } from "socket.io";

export const socketConfig = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

let io: Server | null = null;

export function initSocket(httpServer: http.Server) {
  io = new Server(httpServer, socketConfig);
  return io;
}

export function getSocket() {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initSocket(server) first.");
  }
  return io;
}
