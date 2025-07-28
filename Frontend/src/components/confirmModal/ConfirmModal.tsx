import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  content,
  title = "Confirm Action",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default"
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className={`p-2 rounded-full ${
                    variant === "destructive" 
                      ? "bg-destructive/10 text-destructive" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {title}
                  </h2>
                </motion.div>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  className="text-muted-foreground mb-6 leading-relaxed"
                >
                  {content}
                </motion.p>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="flex gap-3 justify-end"
                >
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="transition-all hover:scale-105"
                  >
                    {cancelText}
                  </Button>
                  <Button
                    variant={variant === "destructive" ? "destructive" : "default"}
                    onClick={handleConfirm}
                    className="transition-all hover:scale-105"
                  >
                    {confirmText}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;