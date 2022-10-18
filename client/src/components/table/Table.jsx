import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Database = () => {
  const rows = [];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className="table"  aria-label="simple table">
          <TableHead>
            <TableRow className="tablerow">
              <TableCell className="tablecell">Rank</TableCell>
              <TableCell className="tablecell">Name</TableCell>
              <TableCell className="tablecell">Genre</TableCell>
              <TableCell className="tablecell">Streams</TableCell>
              <TableCell className="tablecell">Location</TableCell>
              <TableCell className="tablecell">Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="tablecell" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right" className="tablecell">
                  <div className="cellwrapper">
                    <img className="image" src={row.image} />{row.artistname}
                  </div>
                </TableCell>
                
                <TableCell className="tablecell">{row.genre}</TableCell>
                <TableCell className="tablecell">{row.streams}</TableCell>
                <TableCell className="tablecell">{row.location}</TableCell>
                <TableCell className="tablecell">{row.musiclabel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Database;
