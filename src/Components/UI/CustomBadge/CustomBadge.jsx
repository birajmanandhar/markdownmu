import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shapeCircle: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

export default function CustomBadge(props) {
  const classes = useStyles();
  const circle = <div className={classes.shapeCircle}>{props.month}</div>;

  return (
    <div className={classes.root}>
      <Badge color="secondary" overlap="circle" badgeContent={props.day} >
        {circle}
      </Badge>
    </div>
  );
}
