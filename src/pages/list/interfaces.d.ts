// d.ts 文件在编译过程中，不会被编译
// 他那个意思是所有.ts文件都不会被编译成JavaScript文件，还是就d.ts
// 然后很nb的是，这个文件不用自动导入，index.tsx就已经自己拿到了，莫非是存在全局中？
export interface ListProps {
  name: string;
  enthusiasmLevel?:number;
}
export interface ListState {
  currentEnthusiasm: number;
  visible: boolean;
}