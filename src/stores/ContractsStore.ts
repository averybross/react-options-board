import { ContractTable, TableLookup, Dictionary, Contract } from './../components/OptionsBoard/OptionsBoard';

import { observable } from 'mobx';

export class ContractsStore {
    @observable optionsContracts: ContractTable = {};
    @observable optionsDictionary: Dictionary<TableLookup> = {};
    @observable nextDayContracts: Dictionary<Contract> = {};
    @observable activeNextDayContract: Contract | null = null;
}

export default new ContractsStore();