import "./activate.css"

export default function Activate(){
    return (
        <div className="activate">
            <h1>Check your mail app for activation link</h1>
            <div className="openmail">

                <button className="mail activatebtn">Mail app</button>
                <button className="resend activatebtn">Resend link</button>
            </div>
        </div>
    )
}