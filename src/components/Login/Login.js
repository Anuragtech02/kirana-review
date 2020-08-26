import React from 'react'
import styles from './Login.module.css'
import googleIcon from '../../assets/ic/ic_google.png'
import fbIcon from '../../assets/ic/ic_facebook.png'
import signinImg from '../../assets/images/signin-img.png'
import { Grid, Modal, Backdrop, Fade } from '@material-ui/core'

export const LoginBase = () =>{

    const googleLogin = event =>{
        event.preventDefault()
    }
    
    const fbLogin = event =>{
        event.preventDefault()
    }

    const onForgotPassword = event =>{
        event.preventDefault()
    }

    const onSubmit = event =>{
        event.preventDefault()
    }

    const callSignup = event =>{
        event.preventDefault()
    }
    
    const callTerms = event =>{
        event.preventDefault()
    }

    return(
        <Grid container specing={2} className={styles.loginContainer}>
            <img className={styles.image} src={signinImg} alt=""/>
            <div className={styles.formContainer}>
                <h3>Sign In With</h3>
                <div className={styles.socialContainer}>
                    <button className={styles.googleBtn} onClick={googleLogin}>
                        <img width="25px" src={googleIcon} alt=""/> <span>Google</span>
                    </button>
                    <button className={styles.fbBtn} onClick={fbLogin}>
                        <img width="25px" src={fbIcon} alt=""/> <span>Facebook</span>
                    </button>
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" className={styles.input} placeholder="Email or Phone" required />
                    <input type="password" name="pwd" className={styles.input} placeholder="Password" required />
                    <span className={styles.forgotPass}><button onClick={onForgotPassword}>Forgot Password?</button></span>
                    <input type="checkbox" name="remeber" className={styles.checkbox} /><span className={styles.rememberTxt}> Remember Me </span>
                    <button type="submit" className={styles.submitBtn} >Sign In</button>
                </form>
                <span className={styles.signUpLink}>Don't have an account? <button onClick={callSignup}>Sign Up</button></span>
                <span className={styles.tc}>Please read our <button onClick={callTerms}>Terms & Conditions</button></span>
            </div>
        </Grid>
    )
}

export const Login = () => {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <LoginBase />
            </Fade>
        </Modal>
        </div>
    )
}

export default Login