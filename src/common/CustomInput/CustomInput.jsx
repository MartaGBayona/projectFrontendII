import "./CustomInput.css"

export const CustomInput = ({ type, name, value, disabled, changeEmit }) => {

    return (
        <input
            className="customInputDesign"
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
        />
    )
}

export const CustomInputHeader = ({ type, name, value,disabled, changeEmit }) => {

    return (
        <input
            className="customInputHeaderDesign"
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
        />
    )
}

