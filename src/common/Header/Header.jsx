import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

export const Header = () => {
    return (
        <div className="headerDesign">
            <CustomLink
                path="/"
                title="Home"
            />
            <CustomLink
                path="/login"
                title="Login"
            />
            <CustomLink
                path="/register"
                title="Register"
            />
        </div>
    )
}