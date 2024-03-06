import { ChangeEvent, useState } from "react";
import { CharacterSchema } from "../utils/type";
import { Hide, Remove } from "../utils/icons";
import { CustomControl } from "./custom-control";

export const SearchComponent = () => {
    const [search, setSearch] = useState('');
    const [hidden, setHidden] = useState(false);
    const [selected, setSelected] = useState<CharacterSchema[]>([]);
    const onChange = (event: ChangeEvent | any) => {
        setSearch(event.target.value);
    }
    const handleSelected = (data: CharacterSchema): void => {
        if (data.checked) {
            setSelected(selected => [...selected, data]);
        } else {
            setSelected(selected => [...selected.filter(character => character.id !== data.id)]);
        }
    }
    const onClick = (character: CharacterSchema) => {
        character.checked = !character.checked;
        handleSelected(character);
    };
    const onClickHideButton = () => {
        setHidden(!hidden);
    }
    return (
        <>
            <div className="input-container">
                <div>
                    {selected.map(character => {
                        return <div key={character.id} className="selected-characters"><span className="selected-character">{character.name}</span>
                            <button onClick={(event: any) => { event.preventDefault(); onClick(character); }} id="x-button">
                                <Remove />
                            </button>
                        </div>;
                    })}
                </div>
                <input placeholder="Search..." className="input-search" value={search} onChange={onChange} type="text"></input>
                <button onClick={onClickHideButton} id="hide-button">
                    <Hide />
                </button>
            </div>
            <CustomControl search={search} selected={selected} handleSelected={handleSelected} hidden={hidden}></CustomControl>
        </>
    )
}