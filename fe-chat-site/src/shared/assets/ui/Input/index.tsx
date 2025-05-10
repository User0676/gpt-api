import { forwardRef, HTMLProps, useImperativeHandle, useRef } from "react";
import { FiMic, FiArrowRight } from "react-icons/fi";

interface FloatingLabelInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  label: string;
  type?: string;
  width?: string;
  error?: boolean;
  disabled?: boolean;
  size?: 'big' | 'small';
  submitButton?: boolean;
  audio?: boolean;
}

const Input = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, id, type = "text", className, width = 'full', error = false, disabled = false, size = 'big', submitButton = false, audio = false, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    const widthClass = width === 'full' ? 'w-full' : `w-[${width}]`;

    return (
      <div
        className={`relative ${widthClass} ${className}`}
        style={width !== 'full' ? { width } : undefined}
      >
        <div className="flex items-center bg-[#132B64] border border-blue-600 rounded-full px-4 py-3 gap-2">
          {audio && (
            <button onClick={()=>console.log("pressed")}>
            <FiMic className="text-white w-5 h-5 shrink-0" />
            </button>
          )}

          <input
            {...props}
            ref={internalRef}
            id={id}
            disabled={disabled}
            type={type}
            placeholder={label}
            className={`
              flex-1 bg-transparent border-none outline-none text-white placeholder-white
              font-[family-name:var(--font-toyota-type)]
            `}
          />

          {submitButton && (
            <button type="submit" className="bg-[#193B8C] p-2 rounded-[10%]" onClick={()=>console.log("clicked")}>
              <FiArrowRight className="text-white w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "FloatingLabelInput";

export default Input;
