import "./Card.css"

export const Card = ({userName, title, description, clickFunction}) => {

    return (
        <div className="cardDesign" onClick={clickFunction}>
            <div>{userName}</div>
            <div>{title}</div>
            <div>{description}</div>
        </div>
    )
}