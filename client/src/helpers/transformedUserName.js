export const transformedUserName = (name) => {
    if (name.trim().includes(' ')) {
        return name.split(' ')[0];
    };
    return name.length > 10 ? name.slice(0, 10) + '...' : name;
}