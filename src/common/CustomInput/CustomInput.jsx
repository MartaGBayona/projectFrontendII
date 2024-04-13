import "./CustomInput.css"

export const CustomInput = ({className, type, name, value, disabled, changeEmit }) => {

    return (
        <input
            className={className}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
        />
    )
}

export const CustomInputHeader = ({className, type, name, value,disabled, changeEmit }) => {

    return (
        <input
            className={className}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
        />
    )
}

