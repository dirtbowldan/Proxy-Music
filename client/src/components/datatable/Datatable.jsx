import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import "./avatar.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Datatable = () => {
  const [data, setData] = useState([]);
  const posts = useSelector((state) => state.reducers.posts);
  console.log(posts)
  const handleLike = (userid) => {
    //still working on implementing likes
    alert(userid);
  };
  console.log(data)
  useEffect(() => {
        let newid = 0
        let list = [];
        posts.forEach((doc) => {
          list.push({
            ...doc,
          });
          newid += 1
        });
        setData(list);
    
  }, [posts]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/users/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="viewButton"
              onClick={() => handleLike(params.row.id)}
            >
              Like
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="dataTitle">
        <h1>Leaderboard</h1>
      </div>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "rank", sort: "asc" }],
          },
        }}
        rows={data}
        rowHeight={70}
        columns={userColumns.concat(actionColumn)}
        pageSize={100}
        rowsPerPageOptions={[100]}
        autoHeight={true}
        disableColumnSelector={true}
      />
    </div>
  );
};

export default Datatable;
