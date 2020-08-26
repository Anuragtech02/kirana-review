import React from 'react'
import styles from './Signup.module.css'
import googleIcon from '../../assets/ic/ic_google.png'
import fbIcon from '../../assets/ic/ic_facebook.png'
import signupImg from '../../assets/images/signup-img.png'
import { Grid, Modal, Backdrop, Fade } from '@material-ui/core'

export const SignupBase = () =>{

    const googleSignup = event =>{
        event.preventDefault()
    }
    
    const fbSignup = event =>{
        event.preventDefault()
    }

    const onSubmit = event =>{
        event.preventDefault()
    }

    const callLogin = event =>{
        event.preventDefault()
    }
    
    const callTerms = event =>{
        event.preventDefault()
    }

    return(
        <Grid container specing={2} className={styles.signupContainer}>
            <img className={styles.image} src={signupImg} alt=""/>
            <div className={styles.formContainer}>
                <h3>Sign Up With</h3>
                <div className={styles.socialContainer}>
                    <button className={styles.googleBtn} onClick={googleSignup}>
                        <img width="25px" src={googleIcon} alt=""/>
                    </button>
                    <button className={styles.fbBtn} onClick={fbSignup}>
                        <img width="25px" src={fbIcon} alt=""/>
                    </button>
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="name" className={styles.input} placeholder="Your Name" required />
                    <input type="email" name="email" className={styles.input} placeholder="Email or Phone" required />
                    <input type="password" name="pwd" className={styles.input} placeholder="Password" required />
                    <input type="checkbox" name="remeber" className={styles.checkbox} /><span className={styles.rememberTxt}> Remember Me </span>
                    <button type="submit" className={styles.submitBtn} >Sign Up</button>
                </form>
                <span className={styles.signInLink}>Already have an account? <button onClick={callLogin}>Sign In</button></span>
                <span className={styles.tc}>Please read our <button onClick={callTerms}>Terms & Conditions</button></span>
            </div>
        </Grid>
    )
}

export const Signup = () => {
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
            <SignupBase />
            </Fade>
        </Modal>
        </div>
    )
}

export default Signup