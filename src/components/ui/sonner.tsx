import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className=" w-20"
      icons={{
        success: <img src="/Vector.png" alt="success" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#303030",
          "--normal-text": "white",
          "--normal-border": "var(--border)",
          "--border-radius": "16px",
          "--width": "160px",
          "--padding": "0px 16px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "c bg-[#303030]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
