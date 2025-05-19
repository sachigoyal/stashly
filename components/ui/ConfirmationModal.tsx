import React from 'react'
import { LucideIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from './dialog';
import { Button } from './button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

// Map color values to shadcn button variants
const getButtonVariant = (color: string) => {
  switch (color) {
    case "primary": return "default";
    case "danger": return "destructive";
    case "warning": return "outline";
    case "success": return "secondary";
    default: return "outline";
  }
};

const ConfirmationModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-destructive",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}: ConfirmationModalProps) => {
  // Convert the legacy color props to shadcn variants
  const buttonVariant = getButtonVariant(confirmColor);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border shadow-lg"><DialogHeader className="flex flex-row items-center gap-3 pb-1">
          {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        
        {isDangerous && warningMessage && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-2">
            <div className="flex items-start gap-3">
              {Icon && (
                <Icon
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColor}`}
                />
              )}
              <div>
                <p className="font-medium">This action cannot be undone</p>
                <p className="text-sm opacity-90">{warningMessage}</p>
              </div>
            </div>
          </div>
        )}          <p className="text-muted-foreground text-sm ">{description}</p>
        
        <DialogFooter className="flex justify-end space-x-1">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-4 cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button
            variant={buttonVariant}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex items-center gap-1 px-4 font-medium cursor-pointer"
          >
            {Icon && <Icon className="h-4 w-4 mr-1" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal