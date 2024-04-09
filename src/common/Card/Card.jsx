import "./Card.css";

export const Card = ({ userName, title, description, clickFunction, userEmail, likes}) => {

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

export const UserCard = ({ title, description, isDeletable, onDelete }) => {
    return (
        <div className="cardUserDesign">
            <div>{title}</div>
            <div>{description}</div>
            {isDeletable && (
                <button className="buttonDesign" onClick={onDelete}>
                    Borrar
                </button>
            )}
        </div>
    );
}