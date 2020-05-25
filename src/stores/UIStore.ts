import { observable } from 'mobx';

export class UIStore {
    @observable focusedContract: number | null = null;
}

export default new UIStore();