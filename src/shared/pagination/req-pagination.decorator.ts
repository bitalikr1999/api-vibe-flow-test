import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPagination } from '../pagination';

export const ReqPagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IPagination => {
    const req = ctx.switchToHttp().getRequest();

    const query = {
      ...(req.query as any),
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : 20,
    };
    return {
      limit: Number(query.limit),
      page: Number(query.page),
      sortField: query.sortField,
      sort: query.sort,
      skip: Number(query.limit * (query.page - 1)),
      searchString: query.searchString,
    } as IPagination;
  },
);
