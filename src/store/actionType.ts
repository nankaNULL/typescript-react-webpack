export function createActionType(arrayNames: Array<string>) {
  let actionTypeObj: any = {};
  arrayNames.forEach((item: string) => {
    actionTypeObj[item] = item;
  })
  return actionTypeObj;
}