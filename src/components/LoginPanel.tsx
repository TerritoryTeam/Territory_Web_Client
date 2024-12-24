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

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CloseIcon from '@mui/icons-material/Close';
import GithubIcon from '@mui/icons-material/GitHub';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { EmailValidator, PasswordValidator } from "../utils/FormValidator";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmailCredential } from "../store/slices/AuthSlice";

export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

function LoginDialog (props: LoginDialogProps) {
    const {classes} = useStyles();
    const {loginStatus, error} = useSelector((state: RootState) => state.auth);
    
    const dispatch = useDispatch<AppDispatch>();
    
    const [pageType, setPageType] = useState("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [nickName, setNickName] = useState("");
    const [username, setUsername] = useState("");

    const [nickNameError, setNickNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        // Inicializamos los iconos después de que el componente se monte
        
    }, []);

    if (loginStatus === 'success') {
        props.onClose();
    }

    const switchPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const switchLoginRegister = () => {
        setPageType(pageType === "login" ? "register" : "login");
    }

    const handleSignInSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        setEmailError(false);
        setPasswordError(false);

        let emailCheck = EmailValidator(email);
        let passwordCheck = PasswordValidator(password);
        if (!emailCheck || !passwordCheck) {
            setEmailError(!emailCheck);
            setPasswordError(!passwordCheck);

            return;
        }

        dispatch(loginWithEmailCredential({email: email, password: password}))
    };

    return (
        <Dialog 
            open={props.open}>
            <DialogTitle
                className={classes.titleContainer}>
                <Stack direction="column">
                    {
                        pageType === "register" ?
                            <h2 className={classes.headTitle}>Register</h2> : null
                    }
                    {
                        pageType === "login" ?
                            <h2 className={classes.headTitle}>Sign In</h2> : null
                    }
                    <p className={classes.labelTitle}>Welcome to Territory</p>
                </Stack>
            </DialogTitle>
            <IconButton
                className={classes.closeDialogButton}
                onClick={props.onClose}>
                <CloseIcon fontSize="small" color="disabled" />
            </IconButton>
            {
                pageType === "login" ?
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
                                placeholder="Enter Email"
                                value={email}
                                error={emailError}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                error={passwordError}
                                onChange={(e) => setPassword(e.target.value)}
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
                                <Checkbox size="small"/>
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
                            onClick={handleSignInSubmit}
                            disabled={loginStatus === 'loading'}
                            className={classes.signInButton}
                            >
                                {loginStatus === 'loading' ? 
                                    <>
                                        <LoopIcon/>Loading...
                                    </> : "Sign In"}
                        </Button>
                        <Typography
                            className={classes.optionLabel}
                            sx={{ color: "#4b5563ff"}}>    
                            Don't have an account?{'  '}
                            <Link 
                                onClick={switchLoginRegister}
                                href="#"
                                color="primary"
                                underline="none">
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
                    </Stack> : null
            }
            {
                pageType === "register" ?
                    <Stack
                        className={classes.contentContainer}
                        rowGap={3}>
                        <Paper
                            component="form"
                            className={classes.inputPaper}>
                            <AssignmentIndIcon color="disabled"/>
                            <InputBase
                                className={classes.inputFont}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Enter Nick Name"
                                value={nickName}
                                error={nickNameError}
                                onChange={(e) => setNickName(e.target.value)}
                            />
                        </Paper>
                        <Paper
                            component="form"
                            className={classes.inputPaper}>
                            <MailOutlineIcon color="disabled"/>
                            <InputBase
                                className={classes.inputFont}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Enter Email"
                                value={email}
                                error={emailError}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Paper>
                        <Paper
                            component="form"
                            className={classes.inputPaper}>
                            <PersonOutlineIcon color="disabled"/>
                            <InputBase
                                className={classes.inputFont}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Enter User Name"
                                value={username}
                                error={usernameError}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={password}
                                error={passwordError}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <Typography
                            className={classes.optionLabel}
                            sx={{ color: "#4b5563ff"}}>    
                            Already have an account?{'  '}
                            <Link 
                                onClick={switchLoginRegister} 
                                href="#"
                                color="primary" 
                                underline="none">
                                Sign In Now
                            </Link>
                        </Typography>
                    </Stack> : null
            }            
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