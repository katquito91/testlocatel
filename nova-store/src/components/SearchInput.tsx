interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <label className="field">
    Buscar productos
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar por nombre o descripcion"
    />
  </label>
);

export default SearchInput;
