import React, {useState} from "react";
import ButtonBlack from "../Components/Core/ButtonBlack";
import Input from "../Components/Core/Form/Input";
import MainLayout from "../Components/Layout/MainLayout";

const TestPage = () => {
    const [testInput, setTestInput] = useState("")
    const [buttonToggle, setButtonToggle] = useState(false)
    const [inputError, setInputError] = useState(null)

    async function toggleButton() {
        setButtonToggle(!buttonToggle)
        setInputError("cannot do this")
        await new Promise(r => setTimeout(r, 1000));
        return 'error'
    }
	return (
		<MainLayout className={'site-padding test-page'}>
			<h1>test page</h1> 
			<ButtonBlack onClick={toggleButton} errors={true} load={true}>
				test
				<span>label</span>
			</ButtonBlack>
            {buttonToggle && <div>button toggle</div>}
            <Input placeholder={"test"} value={testInput} setValue={setTestInput} type="text" error={inputError}>
            </Input>
		</MainLayout>
	);
};

export default TestPage;
