import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase.js';

const playersRef = firebase.database().ref('players');

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            player: "",
            icon: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

    }
    handleChange(e) {
        console.log("handle change");
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);

    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleSubmit(e) {
        console.log("handleSubmit");
        console.log(this.state);
        e.preventDefault();
        let playerItem = {
            name: this.state.name,
            icon: this.state.icon,
            win: 0,
            active: false,
            queue: false
        }
        playersRef.push(playerItem);
        // console.log(item);
        this.setState({
            open: false,
            name: '',
            icon: '',
        });
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained"
                    color="primary"
                    onClick={this.handleOpen}>Register Player
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <form className={classes.container}
                        onSubmit={this.handleSubmit}
                        noValidate autoComplete="off">

                        <div style={getModalStyle()} className={classes.paper}>
                            <Typography variant="h6" id="modal-title">
                                Register Your Player!
                        </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                <TextField
                                    name="name"
                                    label="Name"
                                    placeholder="Joshua"
                                    margin="normal"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />
                            </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                <TextField
                                    name="icon"
                                    label="Icon"
                                    placeholder="fa fa-reddit"
                                    margin="normal"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    value={this.state.icon}
                                />
                            </Typography>
                            <Button variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}>Submit
                             </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
