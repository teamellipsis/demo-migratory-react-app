import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

class Exit extends React.Component {
    componentDidMount() {
        fetch('/send', {
            method: 'post',
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Exit
                </Typography>
            </div>
        );
    }
}

Exit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exit);
