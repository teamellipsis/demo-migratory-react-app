import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Link from 'next/link';
import Application from '../src/application';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Index extends Application {
    static async getInitialProps() {
        const os = require('os');
        return { platform: os.platform() };
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <Link href="/cal">
                        <Button variant="contained" color="primary" className={classes.button}>
                            Simple Cal on {this.props.platform}
                        </Button>
                    </Link>
                </div>
            </MuiThemeProvider>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
