import * as React from 'react';
import { TextField } from '@fluentui/react';
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { useVatStates } from './services/vathooks';

export interface IControlProps {
  context: ComponentFramework.Context<IInputs>;
  outputChanged: (outputs: IOutputs) => void;
}

export const Control: React.FC<IControlProps> = (props) => {
  const initalVal = props.context.parameters.vatNumberfield?.raw ?? '';
  const vatStates = useVatStates({
    value: initalVal, 
    resources: props.context.resources, 
    outputChanged: props.outputChanged
  });

  return (
    <div className='pcfvatcontainer'>
      <TextField 
        className='pcfvatinput' 
        value={vatStates.input} 
        onChange={(_, value) => vatStates.onInput(value ?? '')}
        styles={{
          fieldGroup: { border: "none" }
        }} 
      />
      <img 
        src={vatStates.img} 
        className='pcfvatimage'
      />
    </div>
  )
}

export default Control