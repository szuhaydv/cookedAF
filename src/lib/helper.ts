export function debounce<T extends Function>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function(this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

export function binSearchCont(target: string, validIngredients: any[]): string[] {
    let left = 0;
    let right = validIngredients.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = target.localeCompare(validIngredients[mid])
        const isStartingWith = validIngredients[mid].startsWith(target)

        if (isStartingWith) {
            let matches = [validIngredients[mid]]
            for (let i = mid + 1; i < validIngredients.length; i++) {
                if (validIngredients[i].startsWith(target)) {
                    matches.push(validIngredients[i])
                } else {
                    break;
                }
            }
            for (let i = mid - 1; i > 0; i--) {
                if (validIngredients[i].startsWith(target)) {
                    matches.push(validIngredients[i])
                } else {
                    break;
                }
            }
            return matches
        } else if (comparison < 0) right = mid - 1;
        else left = mid + 1;
    }
    return [];
}
