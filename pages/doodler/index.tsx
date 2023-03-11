import NavBar from "../../components/NavBar/NavBar";
import Title from "../../components/skullKing/Title";
import { useStoreDispatch, useStoreSelector } from "../../hooks/skullKing";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { useRouter } from "next/router";
import DrawingArea from "@/components/doodler/DrawingArea";

export default function SkullKeeper() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const players = useStoreSelector(playersState);

	return (
		<div>
			<NavBar />
			<Title title="Doodler" page="" />
			<DrawingArea />
		</div>
	);
}
