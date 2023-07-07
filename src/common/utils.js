export const truncate = (str) => {
    return str.length > 25 ? str.substring(0, 24) + "..." : str;    
    };

