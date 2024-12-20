import { 
    useEffect,
    useState 
} from "react";
import { makeStyles } from "tss-react/mui";

import { 
    Button,
    Checkbox,
    Dialog, 
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    InputBase,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GithubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';

export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

function LoginDialog (props: LoginDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const {classes} = useStyles();

    useEffect(() => {
        // Inicializamos los iconos después de que el componente se monte
        
    }, []);

    const switchPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <Dialog 
            open={props.open}>
            <DialogTitle
                className={classes.titleContainer}>
                <Stack direction="column">
                    <h2 className={classes.headTitle}>Sign In</h2>
                    <p className={classes.labelTitle}>Welcome to Territory</p>
                </Stack>
            </DialogTitle>
            <IconButton
                className={classes.closeDialogButton}
                onClick={props.onClose}>
                <CloseIcon fontSize="small" color="disabled" />
            </IconButton>
            <Stack
                className={classes.contentContainer}
                rowGap={3}>
                <Paper
                    component="form"
                    className={classes.inputPaper}>
                    <MailOutlineIcon color="disabled"/>
                    <InputBase
                        className={classes.inputFont}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Username Email"
                    />
                </Paper>
                <Paper
                    component="form"
                    className={classes.inputPaper}>
                    <LockOutlinedIcon color="disabled"/>
                    <InputBase
                        className={classes.inputFont}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        sx={{ 
                            ml: 1,
                            flex: 1,
                            '& input[type="password"]::-ms-reveal': {
                                display: 'none',
                            },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={switchPasswordVisibility}>
                                    {
                                        showPassword ?
                                            <VisibilityIcon fontSize="small" color="disabled"/> :
                                            <VisibilityOffIcon fontSize="small" color="disabled"/> 
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                </Paper>
                <Stack direction="row">
                    <Stack 
                        direction="row" 
                        className={classes.optionContainer}>
                        <Checkbox size="small" defaultChecked />
                        <Typography 
                            sx={{ color: "#4b5563ff"}}
                            className={classes.optionLabel}>Remember me</Typography>
                    </Stack>
                    <Link 
                        href="#" 
                        color="primary"
                        underline="none"
                        sx={{ width:"210px", display: "flex", alignItems: "center", justifyContent: "center", height: "32px"}}
                        className={classes.optionLabel}>Forgot password?</Link>
                </Stack>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={classes.signInButton}
                    >
                        SignIn
                </Button>
                <Typography
                    className={classes.optionLabel}
                    sx={{ color: "#4b5563ff"}}>    
                    Don't have an account?{'  '}
                    <Link href="#" color="primary" underline="none">
                        Register Now
                    </Link>
                </Typography>
                <Divider
                    className={classes.divider}>
                    or
                </Divider>
                <Stack direction="row" justifyContent="center">
                    <IconButton>
                        <GithubIcon color="disabled" fontSize="large" />
                    </IconButton>
                </Stack>
            </Stack>
        </Dialog>
    );
}

const useStyles = makeStyles() ({
    titleContainer: {
        paddingTop: "32px",
        alignItems: "center",
        textAlign: "center",
    },
    headTitle: {
        margin: "0",
        fontSize: "1.5rem",
        lineHeight: "2rem",
        color: "#1f2937ff",
        fontWeight: "700",
    },
    labelTitle: {
        margin: "5px",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        color: "#6b7280ff",
        fontWeight: "400",
    },
    contentContainer: {
        alignItems: "center",
        textAlign: "center",
        padding: "32px",
    },
    closeDialogButton: {
        position: "absolute",
        right: "20px",
        top: "20px",
    },
    inputPaper: {
        width: "320px",
        height: "40px",
        padding: "2px 7px",
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle",
    },
    inputFont: {
        fontSize: "1rem"
    },
    optionContainer: {
        alignItems: "center",
        verticalAlign: "middle",
        width: "100%",
        height: "32px"
    },
    optionLabel: {  
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    },
    signInButton: {
        width: "100%"
    },
    divider: {
        width:"320px",
        color: "#6b7280ff",
        fontSize: "0.875rem",
    }
});

export default LoginDialog;