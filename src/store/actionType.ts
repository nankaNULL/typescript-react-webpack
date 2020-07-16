export function createActionType (arrayNames: string[]): any {
    const actionTypeObj: any = {};
    arrayNames.forEach((item: string) => {
        actionTypeObj[item] = item;
    })
    return actionTypeObj;
}
