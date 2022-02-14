export interface API {
  get(url: string): Promise<Record<string, unknown>>;
}
