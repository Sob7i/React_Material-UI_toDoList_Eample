import React, { Component, Fragment } from "react";
import {Delete} from '@material-ui/icons';
import { withStyles} from '@material-ui/core/styles'
import
 {
    Paper,
    TextField,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
 } from "@material-ui/core";

const styles = ({ spacing: { unit } }) => ({
  root: {
    margin: unit,
    padding: unit * 3,
    maxWidth: 400
  },
  create : {
    marginTop : '7%',
    marginLeft: '31.5%'
  }
});

export default withStyles(styles)(
 class App extends Component {
  state = {
    exercises: [],
    title: ""
  };
  handelChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });
    handelCreate = event => {
      event.preventDefault();  
      if(this.state.title){
        this.setState(({exercises,title})=> ({
          exercises : [
              ...exercises,
              {
               title,
                id : Date.now()
              }
          ],
          title: ''
        }));
      };
     
    };
    handleDelete = id => {
      this.setState(({exercises}) => ({
        exercises : exercises.filter(exercises => exercises.id !== id)
      }))
    }
  render() {
    
    const { exercises,title } = this.state;
    const { classes } = this.props
    return (
     
      <Paper className ={classes.root}> 
        <Typography variant="display1" align="center" gutterBottom>
          Exercises
        </Typography>
        <form onSubmit={this.handelCreate}>
          <TextField
                name="title"
                label="Exercise"
                value={title}
                onChange={this.handelChange}
                margin="normal"
          />
          <Button 
                type="submit"
                color="primary"
                variant="raised" 
                className={classes.create}
                >
            Create
          </Button>
          <List className={classes.list}>
              {exercises.map(({id,title})=> 
                <ListItem key = {id}>
                  <ListItemText primary={title} />
                  <ListItemSecondaryAction>
                   <IconButton
                    color = 'primary'
                    onClick ={() => this.handleDelete(id)}>
                         <Delete/>
                   </IconButton>   
                  </ListItemSecondaryAction>
                </ListItem>
                )}
          </List>
        </form>
      </Paper>
    );
  }
}
)