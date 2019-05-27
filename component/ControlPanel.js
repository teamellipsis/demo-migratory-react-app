import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import Link from 'next/link';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

class ControlPanel extends React.Component {
    // handleMenu = event => {
    //     fetch('/send', {
    //         method: 'post',
    //     });
    // };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            ControlPanel
                        </Typography>
                        <div>
                            <Link href="/exit">
                                <IconButton
                                    aria-haspopup="true"
                                    // onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <Send />
                                </IconButton>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);
