import "./avatar.png";
import AppleIcon from '@mui/icons-material/Apple';
import { Icon } from '@iconify/react';
import CloudIcon from '@mui/icons-material/Cloud';
let rankcount=0
export const userColumns = [
  { field: "oprank", headerName: "Rank", flex: 1, align: 'center'
  },

  {
    field: "artist",
    headerName: "Artist",
    flex: 3,
    
  
    renderCell: (params) => {
      let rankcount=0
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} />
           {params.row.artist}
        </div>
      );
    },
  },
  
  { field: "popularity", headerName: "Fame", flex:1, align: 'center' },
  { field: "followers", headerName: "Followers", flex:1.5, align: 'center'},
  { field: "cfrank", headerName: "FCR", flex:1, align: 'center' },
  { field: "sfrank", headerName: "FSR", flex:1, align: 'center' },

  
  { field: "cprank", headerName: "PCR", flex:1, align: 'center' },
  { field: "sprank", headerName: "PSR", flex:1,align: 'center' },
  { field: "state", headerName: "State", flex:1, },
  { field: "city", headerName: "City", flex:1.5, },
  { field: "links", headerName: "Links", flex:2, renderCell: (params) => {
    let rankcount=0
    return (
      <div className="links">
        <a href={params.row.spotify}><Icon icon="mdi:spotify" className="spotifylink" /></a>
        <a href={params.row.applemusic}><AppleIcon className="applelink" /></a>
        <a href={params.row.soundcloud}><CloudIcon   className="soundcloudlink" /></a>
        
        
      </div>
    );
  }}
];

