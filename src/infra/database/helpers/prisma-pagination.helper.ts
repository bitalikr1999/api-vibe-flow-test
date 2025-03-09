import { IPagination } from 'src/shared/pagination';

export class PrismaPaginationHelper {
  constructor(private pagination: IPagination) {}

  public get() {
    return {
      skip: this.getSkip(),
      take: this.getTake(),
      orderBy: this.getOrder(),
    };
  }

  private getSkip(): number {
    return (
      this.pagination.skip ??
      (this.pagination.page
        ? (this.pagination.page - 1) * this.pagination.limit
        : 0)
    );
  }

  private getTake(): number {
    return Number(this.pagination.limit) || 20;
  }

  private getOrder(): object {
    return {
      [this.pagination.sortField || 'createdAt']:
        this.pagination.sort?.toLowerCase() || 'asc',
    };
  }
}
