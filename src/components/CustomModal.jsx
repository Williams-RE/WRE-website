import { useEffect } from "react";

const CustomModal = ({
  isOpen,
  onRequestClose,
  className,
  overlayClassName,
  children,
}) => {
  useEffect(() => {
    // Disable scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"; // Reset overflow on cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null; // Do not render anything if modal is closed

  return (
    <div className={overlayClassName} onClick={onRequestClose}>
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
