import { useEffect } from "react";
import { io } from "socket.io-client";

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("newPrescription", (message) => {
      console.log("Nuova prescrizione ricevuta:", message);
      // Esegui le azioni necessarie con la nuova prescrizione
    });

    socket.on("approvedPrescription", (message) => {
      console.log("Prescrizione approvata ricevuta:", message);
      // Esegui le azioni necessarie con la prescrizione approvata
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
export default WebSocketComponent;
