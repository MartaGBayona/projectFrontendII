import "./Card.css";

export const Card = ({ userName, title, description, clickFunction, userEmail, likes }) => {

    const cardClicked = () => {
        clickFunction({ userName, userEmail, likes });
    };

    return (
        <div className="cardDesign" onClick={cardClicked}>
            <div>{userName}</div>
            <div>{title}</div>
            <div>{description}</div>
        </div>
    );
};