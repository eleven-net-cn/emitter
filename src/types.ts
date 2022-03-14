export type Fn = (...args: any) => any;

export interface IEvent {
  fn: Fn & { _?: Fn };
  ctx: any;
}
