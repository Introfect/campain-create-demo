import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className=" rounded-full"
      icons={{
        success: (
          <img
            src="/Vector.png"
            alt=""
            className="size-[26px] max-h-none max-w-none object-contain"
            width={26}
            height={26}
          />
        ),
        info: <InfoIcon className="size-[26px] shrink-0" />,
        warning: <TriangleAlertIcon className="size-[26px] shrink-0" />,
        error: <OctagonXIcon className="size-[26px] shrink-0" />,
        loading: <Loader2Icon className="size-[26px] shrink-0 animate-spin" />,
      }}
      closeButton={false}
      style={
        {
          "--normal-bg": "#303030",
          "--normal-text": "#FCFDFF",
          "--normal-border": "var(--border)",
          "--border-radius": "16px",
          "--width": "fit-content",
          "--height": "fit-content",
          "--font-size": "16px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "!p-0 !px-2.5 !py-2 cursor-pointer text-nowrap font-inter text-base leading-[140%] bg-[#303030]",
          title: "font-inter text-base leading-[140%] text-white",
          /* Sonner ships [data-icon]{16×16} with high specificity; ! beats it */
          icon: "!h-[26px] !w-[26px] !min-h-0 !min-w-0",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
