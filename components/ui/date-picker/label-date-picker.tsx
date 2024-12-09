import { BasicDatePicker } from "./date-picker";
import "../components.scss";

interface Props {
    label: string;
}

function LabelDatePicker({ label }: Props) {
    return (
        <div className="date-group">
            <p>{label}</p>
            <BasicDatePicker />
        </div>
    );
}

export { LabelDatePicker };
