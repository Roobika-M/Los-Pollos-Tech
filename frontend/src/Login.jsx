import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    function handleCheck() {
        if (username.trim()) {
            setMessage("you're godamn right");
            return;
        }

        setMessage("enter a username first");
    }

    return (
        <div className="territory">
            <div className="login-card">
                <p className="eyebrow">Login</p>
                <h2>Say my name</h2>
                <input
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                    aria-label="Username"
                />
                <button className="login-button" type="button" onClick={handleCheck}>
                    Check
                </button>
                {message && <p className="login-message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;