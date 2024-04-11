import "./Card.css";

export const Card = ({key, userName, title, description, clickFunction, userEmail, likes}) => {

    const cardClicked = () => {
        clickFunction({ userName, userEmail, likes });
    };

    return (
        <div key={key} className="cardDesign" onClick={cardClicked}>
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


export const PostCard = ({ title, description, handleInputChange, handleSubmit }) => {
    return (
        <div key={"post"} className="cardUserDesign">
            <input className="inputCardDesign"
                type="text" 
                placeholder="Título" 
                value={title} 
                onChange={(e) => handleInputChange("title", e.target.value)} 
            />
            <textarea className="textareaCardDesign"
                placeholder="Descripción" 
                value={description} 
                onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <button className="buttonDesign" onClick={handleSubmit}>
                Crear Post
            </button>
        </div>
    );
}