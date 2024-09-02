import { ButtonProps, Button as RadixButton } from "@radix-ui/themes";
import { Responsive } from "@radix-ui/themes/props";

interface ButtonProperties extends ButtonProps {
  iconWidth?: boolean;
  fullWidth?: boolean;
  size?: Responsive<'1' | '2' | '3' | '4'>
}

const Button: React.FC<ButtonProperties> = ({ iconWidth, fullWidth, size, ...properties }) => {
  return (
    <RadixButton
      {...properties}
      size={size || '3'}
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
