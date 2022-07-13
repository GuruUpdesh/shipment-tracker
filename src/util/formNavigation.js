export default function navigate(event, ref) {

    // key down
    if (event.keyCode == 40) {
        const nextSibling = ref.current.nextSibling

        focus(nextSibling)
    }

    // key up
    if (event.keyCode == 38) {
        const previousSibling = ref.current.previousSibling

        focus(previousSibling)
    }
}

function focus(element) {
    if (!element) {
        return
    }

    const className = element.className.toString()

    if (className.includes("input-container")) {
        const input = element.querySelectorAll("input")[0]
        input.focus()
    }

    if (className.includes("selector-container")) {
        const button = element.querySelectorAll("button")[0]
        button.focus()
    }

    if (className.includes("btn-normal-text") || className.includes("btn-black")) {
        element.focus()
    }
}