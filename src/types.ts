export interface IEvent {
  fn: ((...args: any) => any) & { _?: (...args: any) => any };
  ctx: any;
}
