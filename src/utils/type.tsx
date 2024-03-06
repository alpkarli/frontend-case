export type CharacterSchema = {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
    checked: boolean;
};

export type InnerComponentProps = {
    results: CharacterSchema[];
    setResults: Function;
    search: string;
    handleSelected: Function
};

export type CustomControlProps = {
    search: string;
    selected: CharacterSchema[];
    handleSelected: Function;
    hidden: boolean;
};