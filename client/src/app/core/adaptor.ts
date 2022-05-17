export interface Adaptor<T> {
  adapt(item: any): T;
}
