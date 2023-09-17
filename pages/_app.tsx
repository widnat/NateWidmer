import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyA-Ykfnc6mDOx6oLKPJvpf12QwhZwUzW7w",
	authDomain: "natewidmerprojects.firebaseapp.com",
	projectId: "natewidmerprojects",
	storageBucket: "natewidmerprojects.appspot.com",
	messagingSenderId: "770121869990",
	appId: "1:770121869990:web:b51c16d4161d080e4f2267",
	measurementId: "G-D6KHSGZDM6",
};

const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
