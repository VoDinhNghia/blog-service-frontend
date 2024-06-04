import { io } from 'socket.io-client';
import { authHeaderNoBearer } from "./authHeader";
import { API_URL } from "../constants/constant"

export const socket = io(`${API_URL}/message`, {
  autoConnect: false,
  transportOptions: {
      polling: {
        extraHeaders: authHeaderNoBearer(),
      },
  }
});