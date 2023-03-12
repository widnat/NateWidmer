import NavBar from "../../components/NavBar/NavBar";
import Title from "../../components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "../../hooks/skullKing";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { useRouter } from "next/router";
import DrawingArea from "@/components/doodler/DrawingArea";
import { useEffect, useState } from "react";
let webSocket: WebSocket;

export default function Doodler() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const players = useStoreSelector(playersState);
	const [input, setInput] = useState("");
	var hasConstructed = false;
	useEffect(() => {
		if (!hasConstructed) {
			hasConstructed = true;
			webSocket = new WebSocket("ws://localhost:8080");
			webSocket.onerror = (err) => console.error(err);
			webSocket.onopen = () => console.log("open");
			webSocket.onmessage = (msg) => console.log(msg.data);
			// webSocket.onmessage = (msg) => console.log(JSON.parse(msg.data));
		}
	}, []);

	function onChangeHandler(val: string) {
		setInput(val);
		// socket.emit("input-change", val);
	}

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			<DrawingArea />
			<div>
				the initial screen will show a url or something for users to join when a
				player joins their picture they drew shows up with their className start
				game button
			</div>
			<input
				placeholder="Type something"
				value={input}
				onChange={(e) => onChangeHandler(e.target.value)}
			/>
		</div>
	);
}
