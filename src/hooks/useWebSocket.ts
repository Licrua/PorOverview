"use client";

import { useEffect, useState } from "react";

export default function useWebSocket(url: string) {
    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data).data;
            setData(data);
        };
        return () => {
            socket.close();
        };
    }, [url]);

    const [data, setData] = useState(null);

    return { data };
}
