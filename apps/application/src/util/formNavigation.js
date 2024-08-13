export default function navigate(event, ref) {
	// key down
	if (event.keyCode == 40) {
		const nextSibling = ref.current.nextSibling;
        if (!nextSibling) {
            const parent = {current: ref.current.parentNode}
            return navigate(event, parent)
        }
		focus(nextSibling);

        return
	}

	// key up
	if (event.keyCode == 38) {
        let previousSibling = ref.current.previousSibling;

        const tagName = previousSibling.tagName.toString()
        const className = previousSibling.className.toString()
        if (tagName === "P") {
            previousSibling = ref.current.parentNode.previousSibling
        } else if (className.includes("form-inputs-wrapper")) {
            previousSibling = previousSibling.lastChild
        }

		focus(previousSibling);

        return
	}
}

function focus(element) {
	if (!element) {
		return;
	}

	const className = element.className.toString();

	if (className.includes("input-container")) {
		const input = element.querySelectorAll("input")[0];
		const end = input.value.length;
		input.focus();
		input.setSelectionRange(end, end);
	}

    if (className.includes("checkbox")) {
        const checkbox = element.querySelectorAll("div")[0]
        console.log(checkbox)
        checkbox.focus()
    }

	if (className.includes("selector-container")) {
		const button = element.querySelectorAll("button")[0];
		button.focus();
	}

	if (className.includes("btn-normal-text") || className.includes("btn-black")) {
		element.focus();
	}

    if (className.includes("login-options")) {
        const button  = element.querySelectorAll("button")[0]
        button.focus()
    }
}
