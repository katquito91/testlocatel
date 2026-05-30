interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PriceSlider = ({ value, onChange }: PriceSliderProps) => (
  <label className="field">
    Precio maximo: ${value}
    <input
      type="range"
      min="20"
      max="100"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  </label>
);

export default PriceSlider;
