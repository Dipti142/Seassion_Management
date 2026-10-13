import type { Socket } from "socket.io";
import { getSocket } from "./socket.server";

function userRoom(userId: number) {
  return `user:${userId}`;
}

export function joinUserRoom(socket: Socket, userId: number) {
  socket.join(userRoom(userId));
}

export function disconnectUserSockets(userId: number, message: string, exceptSocketId?: string) {
  const io = getSocket();
  const room = io.sockets.adapter.rooms.get(userRoom(userId));
  if (!room) return;

  for (const socketId of room) {
    if (exceptSocketId && socketId === exceptSocketId) continue;
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) continue;
    socket.emit("force_logout", { message });
    socket.disconnect(true);
  }
}
