import { useContext } from "react";
import { Auth } from "./context/AuthContext";


function handlePaste(
	e: React.ClipboardEvent<HTMLInputElement>,
	inputsRef: React.MutableRefObject<HTMLInputElement[]>
) {
	e.preventDefault();
	const paste = e.clipboardData.getData("text");
	inputsRef.current.forEach((input, i) => {
		input.value = paste[i] || "";
	});
}

const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
	setTimeout(() => {
		event.target.select();
	}, 0);
};
const handleBackspace = (
	index: number,
	event: React.KeyboardEvent<HTMLInputElement>,
	inputsRef: React.MutableRefObject<HTMLInputElement[]>
) => {
	const { value } = event.currentTarget;
	if (value) {
		event.currentTarget.value = "";
		return;
	}
	if (index > 0) {
		inputsRef.current[index - 1].focus();
	}
};

const handleArrowLeft = (
	index: number,
	inputsRef: React.MutableRefObject<HTMLInputElement[]>
) => {
	if (index > 0) {
		inputsRef.current[index - 1].focus();
	}
};

const handleArrowRight = (
	index: number,
	inputsRef: React.MutableRefObject<HTMLInputElement[]>
) => {
	if (index < inputsRef.current.length - 1) {
		inputsRef.current[index + 1].focus();
	}
};

const handleKeyDown = (
	index: number,
	event: React.KeyboardEvent<HTMLInputElement>,
	inputsRef: React.MutableRefObject<HTMLInputElement[]>
) => {
	switch (event.keyCode) {
		case 8: // Backspace
			handleBackspace(index, event, inputsRef);
			break;
		case 37: // Arrow Left
			handleArrowLeft(index, inputsRef);
			break;
		case 39: // Arrow Right
			handleArrowRight(index, inputsRef);
			break;
		default:
			break;
	}
};

const updateAuthState = (newData: Partial<Auth>, store: any) => {
	store.setAuth((auth: Auth) => ({ ...auth, ...newData }));
};

const authenticate = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return false;
	}
	return true;
};

const saveToken = (token: string) => {
	localStorage.setItem("token", token);
};

const removeQuotes = (str: string | undefined) => {
	if (!str) "";
	let newStr = "";
	const arr = str?.split("") || [];
	arr.map((item, index) => {
		if (index !== 0 && index !== arr.length - 1) {
			newStr += item;
		}
	});
	return newStr;
};


export {
	handleArrowLeft,
	handleArrowRight,
	handleBackspace,
	handleFocus,
	handleKeyDown,
	handlePaste,
	updateAuthState,
	removeQuotes
};
