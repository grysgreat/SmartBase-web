/**
 * @FileName: Stack.ts
 * @Description: 栈结构的封装
 * @author 毛毛
 * @date 2021-07-14 16:32
 */

//栈类
export class Stack<T> {
    // 栈中存元素的数组
    private items: Array<T>;
  
    //
  
    constructor() {
      this.items = []
    }
  
    /**
     * 压入元素到栈顶的方法
     * @param ele
     */
    public push(ele: T): void {
      this.items.push(ele);
    }
  
    /**
     * 弹出栈顶元素
     * @return: 弹出的栈顶元素
     */
    public pop(): T {
      return this.items.pop() as T;
    }
  
    // 查看栈顶元素
    public peek(): T {
      return this.items[this.items.length - 1];
    }
  
    // 栈是否为空
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
  //  返回栈结构里面的元素个数
    size(): number {
      return this.items.length;
    }
  
  //  打印栈结构里面的所有元素，以字符串的形式打印
    public toString(): string {
      return this.items.join(',');
    }
  }

  