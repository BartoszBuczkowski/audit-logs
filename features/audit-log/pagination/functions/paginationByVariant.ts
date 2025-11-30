import { PaginationVariant } from "./getPaginationVariant";

export const paginationByVariant: Record<
  PaginationVariant,
  (page: number, totalPages: number) => (number | "ellipsis")[]
> = {
  all: (_, totalPages) => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  },
  nearStart: (_, totalPages) => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  },
  nearEnd: (_, totalPages) => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  },
  middle: (page, totalPages) => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    pages.push("ellipsis");
    for (let i = page - 1; i <= page + 1; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  },
};
