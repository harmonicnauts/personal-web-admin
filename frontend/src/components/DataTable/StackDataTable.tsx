import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from "../ui/table";
import { Stack } from "@/interfaces/Stack";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { handleDelete } from "@/services/fetchData";

interface StackDataTableProps {
  table_name : string;
  data: Stack[];
}

export const StackDataTable: React.FC<StackDataTableProps> = ({ table_name, data }) => {
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Button className="mb-2">
        <Link to={`/stack/`}>
          Add {table_name}
        </Link>
      </Button>
      <Table>
        <TableCaption>A list of your {table_name} data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Actons</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <img src={item.logo} alt={item.name} width="50" />
              </TableCell>
              <TableCell>
                <Button className="m-1">
                  <Link to={`/stack/${item.id}`}>Update</Link>
                </Button>
                <Button className="m-1" onClick={() => {
                  // handleDelete(item.id, 'stack');
                  console.log('Delete Button Clicked!')
                }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};


