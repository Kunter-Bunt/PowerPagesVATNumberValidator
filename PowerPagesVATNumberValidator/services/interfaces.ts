import { IOutputs } from "../generated/ManifestTypes";

export interface VatStatesOutput {
    input: string, 
    onInput: (input: string) => void, 
    img: string, 
    valid: boolean, 
    name: string, 
    address: string, 
}
export interface VatStatesInput {
    value: string, 
    resources: ComponentFramework.Resources,
    outputChanged: (outputs: IOutputs) => void,
}