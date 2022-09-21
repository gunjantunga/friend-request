import '../header.css';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container:{
        margin: '20px',
        display:'flex',
        justifyContent:'center',
    },
    header:{
    fontSize: '30px',
    color: 'rgb(26, 202, 202)',
    fontWeight: 'bold',
    padding: '4px',
    borderBottom:'3px solid rgb(26, 202, 202)'
    },

  }));

export const Header = (props) => {
    const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.header}>{props.children}</span>
    </div>
  );
};
