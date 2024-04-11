import "./Card.css";

export const Card = ({ userName, title, description,  clickFunction, userEmail, like}) => {

    const cardClicked = () => {
        clickFunction({ userName, userEmail, like });
    };

    return (
        <div className="cardDesign" onClick={cardClicked}>
            <div>{userName}</div>
            <div>{title}</div>
            <div>{description}</div>
                        <div>
                Likes: {like?.length || 0}
                {like?.length > 0 && (
                    <div>
                        {like.map((like) => (
                            
                            <div key={like._id}>{like.userName}</div>
                            
                        ))}
                    </div>
                )}
            </div>
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
        <div className="cardPostDesign">
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

export const UserAdminCard = ({ name, email, role, isDeletable, onDelete }) => {
    return (
        <div className="userCard">
            <div className="userData">
                <div className="userName">Nombre: {name}</div>
                <div className="userEmail">Correo: {email}</div>
                <div className="userRole">Rol: {role}</div>
            </div>
            {isDeletable && (
                <button className="buttonDesign" onClick={onDelete}>Eliminar</button>
            )}
        </div>
    );
}