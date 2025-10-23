import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react@0.487.0";
import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = ({ className, ...props }) => (
  <ul
    data-slot="pagination-content"
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
);

const PaginationItem = (props) => <li data-slot="pagination-item" {...props} />;

const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
  <a
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
    {...props}
  >
    <ChevronLeftIcon />
    <span className="hidden sm:block">Previous</span>
  </PaginationLink>
);

const PaginationNext = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
    {...props}
  >
    <span className="hidden sm:block">Next</span>
    <ChevronRightIcon />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
