export const BoldedText = (text: string, shouldBeBold: string) => {
    const textArray = text.split(RegExp(shouldBeBold, "ig"));
    const match = text.match(RegExp(shouldBeBold, "ig"));

    return (
        <span>
            {textArray.map((item: string, index: number) => (
                <span key={index}>
                    {item}
                    {index !== textArray.length - 1 && match && (
                        <b>{match[index]}</b>
                    )}
                </span>
            ))}
        </span>
    );
}