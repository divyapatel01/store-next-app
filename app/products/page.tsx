/* eslint-disable @next/next/no-img-element */
"use client";

import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRoot } from "@/types";
import axios from "axios";
import { ArrowUpAZ, ArrowUpZA } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddNew from "./components/AddNew";
import ProductActions from "./components/ProductActions";

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductRoot>();
  const [tookAction, setTookAction] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
  });
  const [sort, setSort] = useState({ sortBy: "", order: "" });

  useEffect(() => {
    setIsLoading(true);
    if (searchValue.length > 0) {
      axios
        .get(`https://dummyjson.com/products/search?q=${searchValue}`)
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
          setSearch(false);
        });
    } else {
      axios
        .get("https://dummyjson.com/products", {
          params: { ...pagination, ...sort },
        })
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tookAction, search, pagination, sort]);

  if (isLoading) {
    return <Icons.spinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-bold">Products</div>
        <div className="flex gap-4 flex-1 justify-end">
          <Input
            type="search"
            placeholder="Search for Products"
            className="w-80"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => setSearch(true)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setSearch(true);
              }
            }}
          />
          <AddNew setTookAction={() => setTookAction(true)} />
        </div>
      </div>
      {products ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead
                  onClick={() =>
                    setSort({
                      sortBy: "title",
                      order: sort.order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  <div className="flex gap-2 cursor-pointer">
                    <span>Title</span>
                    {sort.order === "asc" ? (
                      <ArrowUpAZ size={16} />
                    ) : (
                      <ArrowUpZA size={16} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
              {products.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium cursor-pointer">
                    <Link href={`/products/${product.id}`}>{product.id}</Link>
                  </TableCell>
                  <TableCell>
                    <img src={product.thumbnail} alt="" className="w-14" />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/products/${product.id}`}
                      className="cursor-pointer"
                    >
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell className="flex gap-2">
                    <ProductActions
                      product={product}
                      setTookAction={() => setTookAction(true)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (pagination.skip !== 0) {
                      setPagination({
                        limit: products.limit,
                        skip: products.skip - products.limit,
                      });
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPagination({
                      limit: products.limit,
                      skip: products.skip + products.limit,
                    })
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        "No Products Found"
      )}
    </>
  );
}
