// import { IFuncResultModel } from "@models/common/FuncResultModel";

export interface IConnector {
  createConnection: () => void
}

export default interface IDB {
  connector: IConnector
}
