export const convertUnit = (text: string, toSystem: 'metric' | 'imperial'): string => {
    if (toSystem === 'metric') {
        // If baseline has "oz", convert to "g"
        const ozMatch = text.match(/(\d+)(?:\s*)oz\b/i);
        if (ozMatch) {
            const oz = parseInt(ozMatch[1]);
            const grams = Math.round(oz / 0.035274);
            return text.replace(ozMatch[0], `${grams} g`);
        }
        return text;
    }

    // Convert "g" to "oz"
    const gMatch = text.match(/(\d+)(?:\s*)g\b/i);
    if (gMatch) {
        const grams = parseInt(gMatch[1]);
        const oz = (grams * 0.035274).toFixed(1);
        return text.replace(gMatch[0], `${oz} oz`);
    }

    // Convert "ml" to "fl oz"
    const mlMatch = text.match(/(\d+)(?:\s*)ml\b/i);
    if (mlMatch) {
        const ml = parseInt(mlMatch[1]);
        const floz = (ml * 0.033814).toFixed(1);
        return text.replace(mlMatch[0], `${floz} fl oz`);
    }

    return text;
};
