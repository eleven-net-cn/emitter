import type { IEvent } from './types';

class Emitter {
  private events: Record<string, IEvent[]> = {};

  /**
   * 绑定
   * @param name 事件名称
   * @param callback 回调函数，接收 emit 触发所有参数
   * @param ctx 回调函数的执行上下文
   * @returns 返回this，支持链式调用
   */
  on(name: string, callback: (...args: any) => any, ctx?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.events[name] || (this.events[name] = []);
    this.events[name].push({
      fn: callback,
      ctx,
    });

    return this;
  }

  /**
   * 绑定事件（仅一次）
   * @param name 事件名称
   * @param callback 回调函数，接收emit触发所有参数
   * @param ctx 回调函数的执行上下文
   * @returns 返回this，支持链式调用
   */
  once(name: string, callback: (...args: any) => any, ctx?: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function listener(...args: any) {
      self.off(name, listener);
      callback.apply(ctx, args);
    }

    listener._ = callback;

    return this.on(name, listener, ctx);
  }

  /**
   * 触发（执行）事件
   * @param name 事件名称
   * @param args 参数列表，传参示例；someObject.emit('eventName', param1, param2, ...)
   * @returns 返回this，支持链式调用
   */
  emit(name: string, ...args: any) {
    const evtArr = (this.events[name] ?? []).slice();

    for (let i = 0; i < evtArr.length; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, args);
    }

    return this;
  }

  /**
   * 解除绑定的事件
   *  1.funcInQueue 参数缺省时，该事件对应的整个回调队列都会被清空，否则仅移除事件的回调队列中的某一函数；
   *
   * @param name 事件名称
   * @param funcInQueue 事件对应的回调函数队列中某一函数
   * @returns 返回this，支持链式调用
   */
  off(name: string, funcInQueue?: (...args: any) => any) {
    const evts: IEvent[] = this.events[name];
    const liveEvents: IEvent[] = [];

    if (evts && funcInQueue) {
      for (let i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== funcInQueue && evts[i].fn?._ !== funcInQueue) {
          liveEvents.push(evts[i]);
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    liveEvents.length ? (this.events[name] = liveEvents) : delete this.events[name];

    return this;
  }
}

export default Emitter;
