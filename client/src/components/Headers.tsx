import { TableCell } from "@mui/material";

export interface IAppProps {
  headers: string[];
}

export default function Headers({ headers }: IAppProps) {
  return (
    <>
      {headers.map((item, index) => {
        if (
          item === "Cover" ||
          item === "Title" ||
          item === "Artist" ||
          item === "Album"
        )
          return (
            <TableCell
              sx={{ fontWeight: "700", color: "rgb(51 65 85)" }}
              key={index}
            >
              {item}
            </TableCell>
          ); // cover header is not right aligned
        return (
          <TableCell
            align="right"
            sx={{ fontWeight: "700", color: "rgb(51 65 85)" }}
            key={index}
          >
            {item}
          </TableCell>
        );
      })}
    </>
  );
}
