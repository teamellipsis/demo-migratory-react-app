import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Link from 'next/link';
import Application from '../src/application';
import ControlPanel from '../component/ControlPanel';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Cal extends Application {
    state = {
        num1: '',
        num2: '',
        result: ''
    };

    // static async getInitialProps() {
    //     return { className: __filename };
    // }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addition = () => {
        let result = Number(this.state.num1) + Number(this.state.num2);
        this.setState({ result });
    };

    substraction = () => {
        let result = Number(this.state.num1) - Number(this.state.num2);
        this.setState({ result });
    };

    multiplication = () => {
        let result = Number(this.state.num1) * Number(this.state.num2);
        this.setState({ result });
    };

    division = () => {
        let result = Number(this.state.num1) / Number(this.state.num2);
        this.setState({ result });
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <form className={classes.container} noValidate autoComplete="off">
                    <ControlPanel />
                        <TextField
                            id="num1"
                            label="Number 1"
                            className={classes.textField}
                            value={this.state.num1}
                            onChange={this.handleChange('num1')}
                            margin="normal"
                        />
                        <TextField
                            id="num2"
                            label="Number 2"
                            className={classes.textField}
                            value={this.state.num2}
                            onChange={this.handleChange('num2')}
                            margin="normal"
                        />
                        <TextField
                            id="result"
                            label="Result"
                            value={this.state.result}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </form>
                    <Button variant="contained" className={classes.button} onClick={this.addition}>
                        +
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.substraction}>
                        -
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.multiplication}>
                        x
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.division}>
                        /
                    </Button>
                    <Link href="/">
                        <Button variant="contained" color="primary" className={classes.button}>
                            Back
                        </Button>
                    </Link>
                </div>
            </MuiThemeProvider>
        );
    }
}

Cal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cal);
