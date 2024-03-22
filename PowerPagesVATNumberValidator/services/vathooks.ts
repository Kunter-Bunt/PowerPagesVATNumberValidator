import { useEffect, useState } from "react";
import { VatStatesInput, VatStatesOutput } from "./interfaces";
import { IOutputs } from "../generated/ManifestTypes";

export function useVatStates(props: VatStatesInput): VatStatesOutput {
    const [input, setInput] = useState<string>(props.value);
    const [img, setImg] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const internalOnInput = (value: string) => onInput(value, props, setInput, setImg, setValid, setName, setAddress);
    useEffect(() => internalOnInput(input)); // to render image onLoad

    return {
        input: input,
        onInput: internalOnInput,
        name: name,
        address: address,
        img: img,
        valid: valid
    }
}

function onInput(
    value: string,
    props: VatStatesInput,
    setInput: (input: string) => void,
    setImg: (input: string) => void,
    setValid: (input: boolean) => void,
    setName: (input: string) => void,
    setAddress: (input: string) => void,
): void {
    let outputs: IOutputs = { vatNumberfield: value };

    setInput(value);
    if (value.startsWith("AT")) {
        props.resources.getResource(
            "img/at.png",
            data => data
                ? setImg("data:image/.png;base64," + data)
                // Next line is for the Sandbox debugger which returns undefined with getResource
                : setImg("data:image/.png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDAgMAAAAXJUhJAAAADFBMVEXtKTntKTn4q7H////BGehuAAAAAXRSTlPUwVjOqwAAACdJREFUeAFjYcAFWEJxyoCIUZlRmVAy086ozKjMatwy5NkzKjOadgD63QQN7gpCVwAAAABJRU5ErkJggg=="),
            () => console.log("Failed to get img"));
        setValid(true);
        outputs.isVatNumberValid = true;
    }
    else {
        setImg("");
        setValid(false);
        outputs.isVatNumberValid = false;
    }
    props.outputChanged(outputs)
}