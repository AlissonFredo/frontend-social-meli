const getLetrasIniciaisDoNomeESobrenome = (nome) => {
    return nome
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
};

export const Utils = {
    getLetrasIniciaisDoNomeESobrenome,
};