import React, { useEffect, useState } from "react";
import styles from '../../styles/page/Auth.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
    const nav = useNavigate();
    const [username, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setLogin] = useState(true);
    const [error, setError] = useState(false);
    const [resError, setReserror] = useState("");
    useEffect(() => {
        isLogin ? document.title = "Register | Clinic" : document.title = "Login | Clinic";
    }, [isLogin]);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await axios.post("https://localhost:3000/auth/log", {
                pass: pass,
                email: email,
            });
            const tok = token.data.data;
            localStorage.setItem("myTok", tok);
            localStorage.setItem("email", email);
            setReserror("Logging In");
            setLogin(false);
            nav("/todo");
        } catch (err) {
            setReserror(err.response.data.message);
            setError(true);
        }
    };
    const errorDetector = () => {
        setError(false);
        setReserror("");
    };
    const handleSign = async (e) => {
        e.preventDefault();
        errorDetector();
        const data = {
            name: username,
            email: email,
            pass: pass,
        };
        try {
            const token = await axios.post("https://localhost:3000/auth/create", data);
            setReserror(token.data.message);
        } catch (err) {
            setReserror(err.response.data.message);
            setError(true);
        }
    };

    const noAcc = () => {
        return (
            <p
                className={styles.accessChange}
                onClick={() => {
                    setLogin((prev) => !prev);
                    errorDetector();
                }}
            >
                Not A Receptionist ?
            </p>
        );
    };
    const existAcc = () => {
        return (
            <p
                className={styles.accessChange}
                onClick={() => {
                    setLogin((prev) => !prev);
                    errorDetector();
                }}
            >
                Not A Doctor ?
            </p>
        );
    };
    return (
        <div className={styles.centerBox}>
            <div className={styles.content}>
                {isLogin ? (
                    <h2 className={styles.header}>Doctor</h2>
                ) : (
                    <h2 className={styles.header}>Receptionist</h2>
                )}
                <form
                    onSubmit={isLogin ? handleSign : handleLogin}
                    className={styles.form}
                >
                    <label className={styles.label} htmlFor="Email">
                        Email
                    </label>
                    <br />
                    <input
                        className={styles.input}
                        type="email"
                        required
                        autoComplete="false"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label className={styles.label} htmlFor="Password">
                        Password
                    </label>
                    <br />
                    <input
                        className={styles.input}
                        type="password"
                        required
                        autoComplete="false"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <br />
                    {resError && !error && <p>{resError}</p>}
                    {error && <p>{resError}</p>}
                    <button type="submit" className={styles.btn} autoComplete="false">
                        Submit
                    </button>
                </form>
                {isLogin ? existAcc() : noAcc()}

            </div>
        </div>
    );
}

export default Auth;