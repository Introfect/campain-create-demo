export interface DropDownLabelsProps {
  label: string;
}

export const DropDownLabels = ({ label }: DropDownLabelsProps) => {
  return (
    <div>
      <label className="text-sm leading-[140%] text-secondary-foreground">
        {label} <span className="text-[#E51C00] text-xs"> *</span>
      </label>
    </div>
  );
};
