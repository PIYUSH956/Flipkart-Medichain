import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useRef } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Upload() {
  const [expanded, setExpanded] = React.useState(false);
  const inputRef = useRef(null);
  const [fileName,setFileName] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFileChange = (e) =>{
    console.log(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="User Name"
        subheader={
          new Date().getDate() +
          " / " +
          (new Date().getMonth() + 1) +
          " / " +
          new Date().getFullYear()
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={require("./uploadicon.png")}
        onClick={(e) => {
          inputRef.current.click();
        }}
        alt="Paella dish"
      />
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {fileName && "Selected File " + fileName}
          <p>Upload Your Document Here to Share or Store </p>
        </Typography>
      </CardContent>
    </Card>
  );
}