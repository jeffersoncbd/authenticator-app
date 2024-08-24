import { ButtonProps, Button as RadixButton } from "@radix-ui/themes";

interface ButtonProperties extends ButtonProps {
  iconWidth?: boolean;
  fullWidth?: boolean
}

const Button: React.FC<ButtonProperties> = ({ iconWidth, fullWidth, ...properties }) => {
  return (
    <RadixButton
      {...properties}
      size="3"
      radius="large"
      variant={iconWidth === true ? "outline" : undefined}
      style={{
        cursor: 'pointer',
        width: iconWidth === true ? '40px' : fullWidth ? '100%' : undefined,
        padding: iconWidth === true ? '0px' : undefined,
        ...properties.style
      }}
    />
  )
}

export default Button
