import "./CustomInput.css"

export const CustomInput = ({ type, name, value, changeEmit }) => {

    return (
        <input
            className="customInputDesign"
            type={type}
            name={name}
            value={value}
            onChange={(e) => changeEmit(e)}
        />
    )
}

export const CustomInputHeader = ({ type, name, value, changeEmit }) => {

    return (
        <input
            className="customInputHeaderDesign"
            type={type}
            name={name}
            value={value}
            onChange={(e) => changeEmit(e)}
        />
    )
}

