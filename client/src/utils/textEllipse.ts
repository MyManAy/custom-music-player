const textEllipse = (maxCharacters: number, text: string) =>
  text.length > maxCharacters
    ? text
        .substring(0, maxCharacters + 1)
        .trim()
        .concat("...")
    : text;

export default textEllipse;
