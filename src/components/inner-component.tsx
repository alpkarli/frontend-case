import { ChangeEvent } from "react";
import { CharacterSchema, InnerComponentProps } from "../utils/type";
import { BoldedText } from "../utils/utils";

export const InnerComponent = ({ results, setResults, search, handleSelected }: InnerComponentProps) => {
    setResults(results.map((characters: CharacterSchema) => {
        return {
            ...characters,
            checked: false,
        };
    }));

    const handleClick = (character: CharacterSchema) => {
        character.checked = !character.checked;
        handleSelected(character);
    }

    const onCheck = (event: ChangeEvent | any, character: CharacterSchema) => {
        event.target.value = !event.target.value;
    }

    return (
        <>
            {results?.map((character: CharacterSchema) => (
                <div key={character.id} className="search-elements" onClick={() => handleClick(character)} >
                    <span className="checkbox-container"><input type="checkbox" checked={character.checked} onChange={(event) => onCheck(event, character)} /></span>
                    <img src={character.image} alt={character.name} width="50" height="50" />&nbsp;
                    <div>
                        <span>{BoldedText(character.name, search)}</span><br />
                        <span style={{color: 'darkslategray'}}>{character.episode.length}&nbsp; Episodes</span>
                    </div>
                </div>
            ))}
        </>
    )
}