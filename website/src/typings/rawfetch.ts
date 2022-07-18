export interface AtomicRawFetchProps<T = Record<string, any>> {
  success: boolean;
  data?: T;
  message?: string;
}
