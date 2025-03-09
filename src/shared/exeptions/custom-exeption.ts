export interface ErrorParams {
  key: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export class CustomException {
  constructor(private readonly params: ErrorParams) {}

  public getParams() {
    return this.params;
  }
}
