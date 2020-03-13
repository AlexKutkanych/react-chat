import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const RoomItem = ({ room, enterRoom, removeRoom }) => {
  const classes = useStyles();
  const { name, created_by_id, member_user_ids, id } = room;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://d26a57ydsghvgx.cloudfront.net/content/blog/BlogImage_Chat.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p"><strong>Created by:</strong> {created_by_id}</Typography>
          <Typography variant="body2" color="textSecondary" component="p"><strong>Members:</strong> {member_user_ids && member_user_ids.join(', ')}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => enterRoom(id)}>
          Go to room
        </Button>
        <Button size="small" color="primary" onClick={() => removeRoom(id)}>
          Remove room
        </Button>
      </CardActions>
    </Card>
  );
}

export default RoomItem;
