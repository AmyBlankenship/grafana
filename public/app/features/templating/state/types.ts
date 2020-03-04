import { VariableModel } from '../variable';
import { VariablesState } from './variablesReducer';

export const EMPTY_UUID = '00000000-0000-0000-0000-000000000000';
export const ALL_VARIABLE_TEXT = 'All';
export const ALL_VARIABLE_VALUE = '$__all';
export const NONE_VARIABLE_TEXT = 'None';
export const NONE_VARIABLE_VALUE = '';

// TODO: move to pickers/types?
export interface VariablePickerProps<Model extends VariableModel = VariableModel> {
  variable: Model;
}

export const getInstanceState = <Model extends VariableModel = VariableModel>(state: VariablesState, uuid: string) => {
  return state[uuid] as Model;
};
