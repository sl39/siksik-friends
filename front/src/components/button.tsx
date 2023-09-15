// button

interface ButtonProps {
  text: string;
  onClick: () => void;
  type: string;
}

export default function Button({ text, onClick, type = "button" }: ButtonProps) {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
}
