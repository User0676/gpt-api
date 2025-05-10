import {
    forwardRef,
    HTMLProps,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";
  import { FiMic, FiMicOff, FiArrowRight } from "react-icons/fi";
  
  
  // ---------- типы ----------
  interface FloatingLabelInputProps
    extends Omit<HTMLProps<HTMLInputElement>, "size"> {
    label: string;
    type?: string;
    width?: string;
    error?: boolean;
    disabled?: boolean;
    size?: "big" | "small";
    submitButton?: boolean;
    audio?: boolean;
  }
  
  // ---------- компонент ----------
  const Input = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
    (
      {
        label,
        id,
        type = "text",
        className,
        width = "full",
        disabled = false,
        size = "big",
        submitButton = false,
        audio = false,
        ...props
      },
      ref
    ) => {
        
      const internalRef = useRef<HTMLInputElement>(null);
      const recognitionRef = useRef<SpeechRecognition | null>(null);
      const [recording, setRecording] = useState(false);
  
      // пробрасываем ref наружу
      useImperativeHandle(ref, () => internalRef.current!);
  
      const widthClass = width === "full" ? "w-full" : `w-[${width}]`;
  
      // -------- инициализация SpeechRecognition --------
      useEffect(() => {
        if (!audio) return; // микрофон не нужен
  
        const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
        if (!SpeechRecognition) {
          console.warn("SpeechRecognition API не поддерживается");
          return;
        }
  
        const recog = new SpeechRecognition();
        recog.lang = "ru-RU";
        recog.interimResults = false;
        recog.maxAlternatives = 1;
  
        recog.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          // добавляем текст в конец текущего значения
          if (internalRef.current) {
            internalRef.current.value =
              (internalRef.current.value
                ? internalRef.current.value + " "
                : "") + transcript;
            // триггерим onChange, если он был передан наружу
            props.onChange?.(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore — synthetic event не нужен, достаточно кастомного
              {
                target: internalRef.current,
              }
            );
          }
        };
  
        recog.onend = () => setRecording(false);
        recog.onerror = () => setRecording(false);
  
        recognitionRef.current = recog;
      }, [audio, props]);
  
      // -------- обработчик кнопки микрофона --------
      const toggleRecording = () => {
        const recog = recognitionRef.current;
        if (!recog) return;
  
        if (recording) {
          recog.stop();
          setRecording(false);
        } else {
          try {
            recog.start(); // запросит разрешение
            setRecording(true);
          } catch {
            /* Safari бросает, если start во время работы */
          }
        }
      };
  
      return (
        <div
          className={`relative ${widthClass} ${className}`}
          style={width !== "full" ? { width } : undefined}
        >
          <div className="flex items-center bg-[#132B64] border border-blue-600 rounded-full px-4 py-3 gap-2">
            {audio && (
              <button type="button" onClick={toggleRecording}>
                {recording ? (
                  <FiMicOff className="text-red-500 w-5 h-5" />
                ) : (
                  <FiMic className="text-white w-5 h-5" />
                )}
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
              <button
                type="submit"
                className="bg-[#193B8C] p-2 rounded-[10%]"
                onClick={() => console.log("clicked")}
              >
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
  