import { getNamespace } from "continuation-local-storage";




// const namespace = getNamespace("ns");





const setNamespace = ( name: string ) => {
  getNamespace("ns")!.set("name", name);
};